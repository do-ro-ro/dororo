package com.dororo.api.map.service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import org.springframework.stereotype.Component;

import com.dororo.api.convert.AxisCalculator;
import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.LinkEntity;
import com.dororo.api.db.entity.NodeEntity;
import com.dororo.api.db.repository.LinkRepository;
import com.dororo.api.db.repository.NodeRepository;
import com.dororo.api.exception.NoMapException;
import com.dororo.api.map.dto.CreateMapRequestDto;
import com.dororo.api.map.dto.CreateMapResponseDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class MapAlgorithm {
	private final NodeRepository nodeRepository;
	private final LinkRepository linkRepository;
	private final AxisCalculator axisCalculator;

	List<NodeEntity> nodeEntityList;
	List<LinkEntity> linkEntityList;

	public String getStartNode (LatitudeLongitude startPoint) { //출발 좌표에서 가장 가까운 노드 찾기

		return nodeRepository.getStartNode(startPoint.getLng(), startPoint.getLat());
	}

	public void getLinks (LatitudeLongitude startPoint, float distance) { //반경 내 링크 저장

		distance = (distance-1) / 100;
		linkEntityList = linkRepository.getLinkEntityList(startPoint.getLng(), startPoint.getLat(), distance);
		return;
	}

	public void getNodes (LatitudeLongitude startPoint, float distance) {
		distance = (distance+1) / 100;
		nodeEntityList = nodeRepository.getNodeEntityList(startPoint.getLng(), startPoint.getLat(), distance);
		return;
	}

	public List<CreateMapResponseDto> getMap(String startNode, List<LinkEntity> startLinks, CreateMapRequestDto createMapRequestDto) {
		List<CreateMapResponseDto> finalMapList = new ArrayList<>();

		Map<String, List<LinkEntity>> map = makeEdgeList(linkEntityList);
		Map<String, LatitudeLongitude> nodeMap = makeNodePointList(nodeEntityList);

		Queue<Link> q = new ArrayDeque<>();
		List<String> mapInit = new ArrayList<>();
		int cnt = 0;
		int minDiff = 100; //충족해야하는 조건과의 최소 차이
		int fulfilledLeft = 0, fulfilledRight = 0, fulfilledUTurn = 0; //충족된 좌,우회전,유턴 횟수
		int sumNeedTurns = createMapRequestDto.getUuuTurn() + createMapRequestDto.getTurnLeft() + createMapRequestDto.getTurnRight(); //조건 합

		mapInit.add(startNode);
		//시작 노드에 연결된 링크 큐에 추가
		for(int i=0;i<startLinks.size();i++) {
			List<String> tempMapInit = new ArrayList<>();
			tempMapInit.addAll(mapInit);
			tempMapInit.add(startLinks.get(i).getTNodeId());
			q.offer(new Link(startLinks.get(i), 0, 0, 0, 0, tempMapInit));
		}

		while(!q.isEmpty()){
			if(cnt >= 5) break;
			Link cur = q.poll();

			int newTurnRight = cur.getTurnRight();
			int newTurnLeft = cur.getTurnLeft();
			int newUTurn = cur.getUTurn();
			float newDistance = cur.getMapDistance();
			List<String> newMap = new ArrayList<>();
			newMap.addAll(cur.getNodeIds());

			if(minDiff > sumNeedTurns-(newTurnLeft+newTurnRight+newUTurn)){
				minDiff = sumNeedTurns-(newTurnLeft+newTurnRight+newUTurn);
				fulfilledLeft = newTurnLeft;
				fulfilledRight = newTurnRight;
				fulfilledUTurn = newUTurn;
			}

			//사용자 입력 조건에 만족하면
			if(newTurnRight>=createMapRequestDto.getTurnRight()
				&& newTurnLeft>=createMapRequestDto.getTurnLeft()
				&& newUTurn>=createMapRequestDto.getUuuTurn()
				&& (newDistance>=createMapRequestDto.getMapDistance()*1000)
				&& (newDistance<createMapRequestDto.getMapDistance()*1000+500)) {

				cnt++;

				cur.setNodeIds(newMap);
				// Link -> CreateMapResponseDto로 변환해서 finalMapList에 넣어주기
				List<LatitudeLongitude> originMapRouteAxis = new ArrayList<>();
				List<LatitudeLongitude> convertedRouteAxis = new ArrayList<>();

				for(int i=0;i<cur.getNodeIds().size();i++) originMapRouteAxis.add(nodeMap.get(cur.getNodeIds().get(i)));
				for(int i=0;i<cur.getNodeIds().size()-1;i++) convertedRouteAxis.add(axisCalculator.calculateBearing(originMapRouteAxis.get(i).getLat(), originMapRouteAxis.get(i).getLng(), originMapRouteAxis.get(i+1).getLat(), originMapRouteAxis.get(i+1).getLng()));

				finalMapList.add(new CreateMapResponseDto(originMapRouteAxis, convertedRouteAxis, newDistance));

				System.out.println("좌회전 횟수: " + newTurnLeft);
				System.out.println("우회전 횟수: " + newTurnRight);
				System.out.println("유턴 횟수: " + newUTurn);

				continue;
			}

			//cur의 t_node_id로 map 조회 -> 연결된 링크 불러옴
			List<LinkEntity> nextLinks = map.get(cur.getLinkEntity().getTNodeId());

			//연결된 링크로 갈 수 있는 지 확인 (거리, 좌우회전 유턴 조건)
			//못가면 컨티뉴
			//갈 수 있으면 길이, 좌우회전 유턴 값 추가하고 큐에 넣기
			for(int i=0;i<nextLinks.size();i++){
				List<String> tempMap = new ArrayList<>();
				tempMap.addAll(newMap);
				int tempTurnRight = newTurnRight;
				int tempTurnLeft = newTurnLeft;
				int tempUuuTurn = newUTurn;
				float tempDistance = newDistance;

				LinkEntity next = nextLinks.get(i);

				String turnInfo = getTurnInfo(nodeMap, cur, next);
				// 좌우회전, 유턴 판별하고 조건에 안맞으면 continue
                if(turnInfo.equals("left")) {
					tempTurnLeft = cur.getTurnLeft()+1;
					if(tempTurnLeft<=createMapRequestDto.getTurnLeft())
						tempTurnLeft++;
					else
						continue;
				} else if(turnInfo.equals("right")){
					tempTurnRight = cur.getTurnRight()+1;
					if(tempTurnRight<=createMapRequestDto.getTurnRight())
						tempTurnRight++;
				} else if(isUTurn(cur,next)) {
					tempUuuTurn=cur.getUTurn()+1;
					if(tempUuuTurn<=createMapRequestDto.getUuuTurn())
						tempUuuTurn++;
				}
				//갈 수 있으면
				tempMap.add(next.getTNodeId());    // 다음 링크의 To 노드 아이디 좌표에 저장

				tempDistance+=next.getLinkDistance();
				if(tempDistance > createMapRequestDto.getMapDistance()*1000+2000)
					continue;
				q.offer(new Link(next, tempTurnLeft, tempTurnRight, tempUuuTurn, tempDistance, tempMap));
			}
		}

		//경로 안나왔을 때
		if(cnt == 0){
			throw new NoMapException(
					createMapRequestDto.getTurnLeft()-fulfilledLeft,
					createMapRequestDto.getTurnRight()-fulfilledRight,
					createMapRequestDto.getUuuTurn()-fulfilledUTurn);
		}
		return finalMapList;
	}

	private String getTurnInfo(Map<String, LatitudeLongitude> nodeMap, Link cur, LinkEntity next) {
		//long beforeTime = System.currentTimeMillis();

		LatitudeLongitude prevNode = nodeMap.get(cur.getLinkEntity().getFNodeId());
		LatitudeLongitude curNode = nodeMap.get(cur.getLinkEntity().getTNodeId());
		LatitudeLongitude nextNode = nodeMap.get(next.getTNodeId());

		double prevNodeY = prevNode.getLat();
		double prevNodeX = prevNode.getLng();

		double curNodeY = curNode.getLat();
		double curNodeX = curNode.getLng();

		double nextNodeY = nextNode.getLat();
		double nextNodeX = nextNode.getLng();

		double o1 = Math.atan2((prevNodeY-curNodeY), (prevNodeX-curNodeX));
		double o2 = Math.atan2((nextNodeY-curNodeY), (nextNodeX-curNodeX));

		double degree = Math.abs((o1-o2)*180/Math.PI);

		/*long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
		long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
		System.out.println("시간차이(m) : "+secDiffTime);*/

		//System.out.println("degree : "+ degree);

		if(degree>60 && degree<120){
			/*System.out.println("prevNode : "+ prevNodeX +", "+prevNodeY);
			System.out.println("curNode : "+ curNodeX +", "+curNodeY);
			System.out.println("nextNode : "+ nextNodeX +", "+nextNodeY);*/
			return "left";
		} else if(degree>240 && degree<300)
			return "right";

		return "noTurn";
	}

	private boolean isUTurn(Link cur, LinkEntity next) {
		if(next.getTNodeId().equals(cur.getLinkEntity().getFNodeId()))    // 다음 링크의 목표 노드가 현재 링크의 출발 노드와 같으면 유턴으로 판별
			return true;
		return false;
	}

	private Map<String, List<LinkEntity>> makeEdgeList(List<LinkEntity> linkEntityList) {

		Map<String, List<LinkEntity>> map = new HashMap<>();
		System.out.println("linkEnntityList size : "+linkEntityList.size());
		for(int i=0;i<linkEntityList.size();i++){
			List<LinkEntity> values = new ArrayList<>();
			String key = linkEntityList.get(i).getFNodeId();

			for(int j=0;j<linkEntityList.size();j++){
				if(linkEntityList.get(j).getFNodeId().equals(key)){
					values.add(linkEntityList.get(j));
				}
			}
			map.put(key, values);
		}
		return map;
	}
	private Map<String, LatitudeLongitude> makeNodePointList(List<NodeEntity> nodeEntityList) {
		Map<String, LatitudeLongitude> map = new HashMap<>();
		for(int i=0;i<nodeEntityList.size();i++){
			String node = nodeEntityList.get(i).getNodeId();
			LatitudeLongitude point = nodeRepository.getNodePoint(node);

			map.put(node, point);
		}
		return map;
	}

	public List<LinkEntity> getStartLinks(String startNode) {
		List<LinkEntity> startLinks = linkRepository.getStartLinks(startNode);

		return startLinks;//
	}
}
