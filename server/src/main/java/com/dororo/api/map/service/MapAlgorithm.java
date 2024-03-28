package com.dororo.api.map.service;

import org.springframework.stereotype.Component;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.NodeEntity;
import com.dororo.api.db.repository.NodeRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class MapAlgorithm {
	private final NodeRepository nodeRepository;
	public String getStartNode (LatitudeLongitude startPoint) { //출발 좌표에서 가장 가까운 노드 찾기
		return nodeRepository.getStartNode(startPoint.getLng(), startPoint.getLat());
	}

}
