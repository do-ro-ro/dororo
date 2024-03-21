package com.dororo.api.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "turn_infos")	// schema 설정 따로 x, public schema 내에 생성됨.
public class TurnInfoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer turnInfoGid;

	@Column(nullable = false)
	private String nodeId;
	@Column(nullable = false)
	private String stLinkId;
	@Column(nullable = false)
	private String edLinkId;
	@Column(nullable = false)
	private String turnType;

}