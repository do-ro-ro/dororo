package com.dororo.api.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "links")
public class LinkEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer linkGid;

	private String linkId;
	private String fNodeId; //출발 노드
	private String tNodeId; //도착 노드
	private Double length; //링크 길이
	private String roadType; //도로 유형
	private Integer traffic; //교통량
	private Integer accidentVolume; //사고량
}