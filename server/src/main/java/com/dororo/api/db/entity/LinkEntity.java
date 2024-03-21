package com.dororo.api.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "links")	// schema 설정 따로 x, public schema 내에 생성됨.
public class LinkEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer linkGid;

	@Column(nullable = false)
	private String linkId;
	@Column(nullable = false)
	private String fNodeId; // 출발 노드
	@Column(nullable = false)
	private String tNodeId; // 도착 노드
	@Column(nullable = false)
	private Double linkDistance; // 링크 길이
	@Column(nullable = false)
	private String roadType; // 도로 유형
	@Column(nullable = false) @ColumnDefault("0")	// 새로운 링크가 추가될 때를 대비, default 값을 0으로 설정
	private Integer traffic; // 교통량
	@Column(nullable = false) @ColumnDefault("0")	// 새로운 링크가 추가될 때를 대비, default 값을 0으로 설정
	private Integer accidentVolume; // 사고량

}