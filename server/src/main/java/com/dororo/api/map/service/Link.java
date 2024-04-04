package com.dororo.api.map.service;

import java.util.List;

import com.dororo.api.db.entity.LinkEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Link {
	private LinkEntity linkEntity;
	private int turnLeft;
	private int turnRight;
	private int uuuTurn;
	private float mapDistance;
	private List<Double> turnDegrees;	// 회전했을 때 각들 저장

	private List<String> nodeIds;
}
