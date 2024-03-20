package com.dororo.api.db.entity;

import org.locationtech.jts.geom.Point;

import jakarta.persistence.Column;
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
@Table(name = "nodes")	// schema 설정 따로 x, public schema 내에 생성됨.
public class NodeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer nodeGid;

	@Column(nullable = false)
	private String nodeId;
	@Column(nullable = false)
	private String nodeType;
	@Column(nullable = false)
	private String nodeName;
	@Column(nullable = false, columnDefinition = "geometry(Point, 4326)")
	private Point nodePoint;

}
