package com.dororo.api.map.service;

import java.sql.SQLOutput;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import org.antlr.v4.runtime.misc.Array2DHashSet;
import org.aspectj.weaver.Iterators;
import org.springframework.stereotype.Component;

import com.dororo.api.convert.AxisCalculator;
import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.LinkEntity;
import com.dororo.api.db.entity.NodeEntity;
import com.dororo.api.db.repository.LinkRepository;
import com.dororo.api.db.repository.NodeRepository;
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

	public List<NodeEntity> getNodes (LatitudeLongitude startPoint, float distance) { //반경 내 노드 저장
		distance = distance / 100;
		nodeEntityList = nodeRepository.getNodeEntityList(startPoint.getLng(), startPoint.getLat(), distance);

		return nodeEntityList;
	}

	public void getLinks (LatitudeLongitude startPoint, float distance) { //반경 내 링크 저장
		distance = distance / 100;
		linkEntityList = linkRepository.getLinkEntityList(startPoint.getLng(), startPoint.getLat(), distance);

		return;
	}

	public List<CreateMapResponseDto> getMap(String startNode, List<LinkEntity> startLinks, CreateMapRequestDto createMapRequestDto) {
		List<CreateMapResponseDto> finalMapList = new ArrayList<>();
		Map<String, List<LinkEntity>> map = makeEdgeList(linkEntityList);


		Queue<Link> q = new ArrayDeque<>();
		List<String> mapInit = new ArrayList<>();
		int cnt = 0;

		mapInit.add(startNode);
		//시작 노드에 연결된 링크 큐에 추가
		for(int i=0;i<startLinks.size();i++) {
			q.offer(new Link(startLinks.get(i), 0, 0, 0, 0, mapInit));
		}
		while(!q.isEmpty()){
			if(cnt > 10) break;
			Link cur = q.poll();

			int newTurnRight = cur.getTurnRight();
			int newTurnLeft = cur.getTurnLeft();
			int newUTurn = cur.getUTurn();
			float newDistance = cur.getMapDistance();
			//System.out.println("DIs : "+newDistance);
			List<String> newMap = new ArrayList<>();
			newMap.addAll(cur.getNodeIds());

			//사용자 입력 조건에 만족하면
				// newMap.add(cur.getTNodeId()); //도착점 노드
				// newMap를 resultMap에 추가 (+ distance도 추가 저장)
			if(/*newTurnRight==createMapRequestDto.getTurnRight()
			&& newTurnLeft==createMapRequestDto.getTurnLeft()
			&& */newUTurn==createMapRequestDto.getUTurn()
			&& (newDistance>=createMapRequestDto.getMapDistance()*1000)
				&& (newDistance<createMapRequestDto.getMapDistance()*1000+500)) {
				cnt++;
				newMap.add(cur.getLinkEntity().getTNodeId());
				cur.setNodeIds(newMap);
				// Link -> CreateMapResponseDto로 변환해서 finalMapList에 넣어주기
				List<LatitudeLongitude> originMapRouteAxis = new ArrayList<>();
				List<LatitudeLongitude> convertedRouteAxis = new ArrayList<>();

				for(int i=0;i<cur.getNodeIds().size();i++) originMapRouteAxis.add(nodeRepository.getNodePoint(cur.getNodeIds().get(i)));
				for(int i=0;i<cur.getNodeIds().size()-1;i++) convertedRouteAxis.add(axisCalculator.calculateBearing(originMapRouteAxis.get(i).getLat(), originMapRouteAxis.get(i).getLng(), originMapRouteAxis.get(i+1).getLat(), originMapRouteAxis.get(i+1).getLng()));

				finalMapList.add(new CreateMapResponseDto(originMapRouteAxis, convertedRouteAxis, newDistance));

			}

			//cur의 f_node_id로 map 조회 -> 연결된 링크 불러옴
			List<LinkEntity> nextLinks = map.get(cur.getLinkEntity().getFNodeId());

			//연결된 링크로 갈 수 있는 지 확인 (거리, 좌우회전 유턴 조건)
				//못가면 컨티뉴
				//갈 수 있으면 길이, 좌우회전 유턴 값 추가하고 큐에 넣기
			for(int i=0;i<nextLinks.size();i++){
				LinkEntity next = nextLinks.get(i);

				//거리 조건 확인
				newDistance += next.getLinkDistance();
				if(newDistance>5000)
					continue;

				//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//좌우회전, 유턴 판별 로직...으로 판별하고 조건에 안맞으면 continue
				/*if(isTurnRight(cur,next)) {
					newTurnRight = cur.getTurnLeft()+1;
					if(newTurnRight>createMapRequestDto.getTurnRight())
						continue;
				}
				else if(isTurnLeft(cur,next)) {
					newTurnLeft=cur.getTurnLeft()+1;
					if(newTurnLeft>createMapRequestDto.getTurnLeft())
						continue;
				}*/
				//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				else if(isUTurn(cur,next)) {
					newUTurn=cur.getUTurn()+1;
					if(newUTurn>createMapRequestDto.getUTurn())
						continue;
				}

				//갈 수 있으면
				newMap.add(next.getFNodeId());
				newDistance+=next.getLinkDistance();
				q.offer(new Link(cur.getLinkEntity(), newTurnLeft, newTurnRight, newUTurn, newDistance, newMap));
			}
		}

		return finalMapList;
	}

	private boolean isTurnLeft(Link cur, LinkEntity next) {
		//cur.t_node와 next.t_node 좌표 비교해서 좌회전인지
		return false;
	}

	private boolean isTurnRight(Link cur, LinkEntity next) {
		//cur.t_node와 next.t_node 좌표 비교해서 우회전인지
		return false;
	}

	private boolean isUTurn(Link cur, LinkEntity next) {
		if(next.getTNodeId().equals(cur.getLinkEntity().getFNodeId()))	// 다음 링크의 목표 노드가 현재 링크의 출발 노드와 같으면 유턴으로 판별
			return true;
		return false;
	}

	private Map<String, List<LinkEntity>> makeEdgeList(List<LinkEntity> linkEntityList) {

		Map<String, List<LinkEntity>> map = new HashMap<>();

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

	public List<LinkEntity> getStartLinks(String startNode) {
		List<LinkEntity> startLinks = linkRepository.getStartLinks(startNode);

		return startLinks;
	}
}
