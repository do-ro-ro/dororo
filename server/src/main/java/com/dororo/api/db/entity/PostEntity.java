package com.dororo.api.db.entity;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "posts")	// schema 설정 따로 x, public schema 내에 생성됨.
public class PostEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer postId;

	@OneToOne(targetEntity = MapEntity.class)
	@JoinColumn(name = "mapId") @Column(nullable = false)
	private MapEntity mapId;
	@Column(nullable = false) private String postTitle;
	@Column(nullable = false) private String postContent;
	@Column(nullable = false) private Timestamp createdAt;
	@Column(nullable = false) private Timestamp updatedAt;
	@Column(nullable = false) private int scrapCount;

	@ElementCollection
	@CollectionTable(name = "reviews", joinColumns = @JoinColumn(name = "post_id"))
	@Column(name="reviewRef")
	private List<String> reviewRefs = new ArrayList<>();

}