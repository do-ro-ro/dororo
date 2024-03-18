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
@Table(name = "turninfos")
public class TurnInfoEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer turnInfoGid;

	private String nodeId;
	private String stLinkId;
	private String edLinkId;
	private String turnType;
}
