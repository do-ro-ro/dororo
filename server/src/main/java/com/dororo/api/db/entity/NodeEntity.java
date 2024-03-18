package com.dororo.api.db.entity;

import org.locationtech.jts.geom.Point;

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
@Table(name = "nodes")
public class NodeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer nodeGid;

	private String nodeId;
	private String nodeType;
	private String nodeName;
	private Point nodePoint;
}
