package com.dororo.api.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.dororo.api.db.entity.LinkEntity;

@Repository
public interface LinkRepository extends JpaRepository<LinkEntity, Integer> {

	@Query(value = "SELECT * " +
		"FROM links " +
	 	"WHERE f_node_id IN (" +
		"SELECT node_id " +
		"FROM nodes " +
		"WHERE ST_DWithin(node_point, ST_SetSRID(ST_Point(?1, ?2), 4326), ?3))",
		nativeQuery = true)
	List<LinkEntity> getLinkEntityList(double lng, double lat, float distance);

	@Query(value = "SELECT * " +
		"FROM links " +
		"WHERE f_node_id = ?1",
		nativeQuery = true)
	List<LinkEntity> getStartLinks(String startNode);
}
