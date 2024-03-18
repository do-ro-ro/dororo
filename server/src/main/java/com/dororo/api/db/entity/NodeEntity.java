package com.dororo.api.db.entity;

import org.springframework.data.geo.Point;

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
@Table(name = "nodes")
public class NodeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer nodeGid;

	private String nodeId;
	private String nodeType;
	private String nodeName;
	@Column(columnDefinition = "geometry(Point, 4326)")
	private Point nodePoint;
}
