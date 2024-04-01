package com.dororo.api.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dororo.api.db.entity.NodeEntity;
import com.dororo.api.db.entity.TurnInfoEntity;

@Repository
public interface TurninfoRepository extends JpaRepository<TurnInfoEntity, Integer> {
	@Query(value = "SELECT distinct node_id " +
		"FROM turn_infos " +
		"WHERE node_id IN (" +
		"SELECT node_id " +
		"FROM nodes " +
		"WHERE ST_DWithin(node_point, ST_SetSRID(ST_Point(?1, ?2), 4326), ?3)) " +
		"AND turn_type ='011'",nativeQuery = true)
	List<String> getNodeTurnInfos(double lng, double lat, float distance);
}
