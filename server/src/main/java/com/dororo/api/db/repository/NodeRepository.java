package com.dororo.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.NodeEntity;

@Repository
public interface NodeRepository extends JpaRepository<NodeEntity, Integer> {

	@Query(value = "SELECT node_id " +
		"FROM nodes " +
		"ORDER BY node_point <-> ST_SetSRID(ST_GeomFromText(CONCAT('POINT(', ?1, ' ', ?2, ')')), 4326) " +
		"LIMIT 1", nativeQuery = true)
	String getStartNode(Double lng, Double lat);

}
