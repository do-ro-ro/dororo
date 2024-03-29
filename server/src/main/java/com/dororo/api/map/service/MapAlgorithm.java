package com.dororo.api.map.service;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.antlr.v4.runtime.misc.Array2DHashSet;
import org.aspectj.weaver.Iterators;
import org.springframework.stereotype.Component;

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

	public List<LinkEntity> getLinks (LatitudeLongitude startPoint, float distance) { //반경 내 링크 저장
		distance = distance / 100;
		linkEntityList = linkRepository.getLinkEntityList(startPoint.getLng(), startPoint.getLat(), distance);

		return linkEntityList;
	}

	public List<CreateMapResponseDto> getMap(String startNode, CreateMapRequestDto createMapRequestDto) {
		Map<String, List<LinkEntity>> map = makeEdgeList(linkEntityList);

		/*for(Map.Entry<String, List<LinkEntity>> entrySet : map.entrySet()){
			System.out.println(entrySet.getKey() + " : "+entrySet.getValue().toString());
		}*/


		return null;
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
}
