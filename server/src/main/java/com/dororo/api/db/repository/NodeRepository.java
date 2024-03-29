package com.dororo.api.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dororo.api.db.entity.NodeEntity;

@Repository
public interface NodeRepository extends JpaRepository<NodeEntity, Integer> {

	@Query(value = "SELECT node_id " +
		"FROM nodes " +
		"ORDER BY node_point <-> ST_SetSRID(ST_GeomFromText(CONCAT('POINT(', ?1, ' ', ?2, ')')), 4326) " +
		"LIMIT 1", nativeQuery = true)
	String getStartNode(Double lng, Double lat);

	@Query(value = "SELECT * " +
		"FROM nodes " +
		"WHERE ST_DWithin(node_point, ST_SetSRID(ST_Point(?1, ?2), 4326), ?3)",
		nativeQuery = true)
	List<NodeEntity> getNodeEntityList(double lng, double lat, float distance);



}
