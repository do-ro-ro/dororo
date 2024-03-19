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
@Table(name = "posts")
public class PostEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer postId;

	@OneToOne(targetEntity = MapEntity.class)
	@JoinColumn(name = "mapId")
	private MapEntity mapId;
	private Integer userId;
	private String postTitle;
	private String postContent;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private Integer scrapCount;

	@ElementCollection
	@CollectionTable(name = "reviews", joinColumns = @JoinColumn(name = "post_id"))
	@Column(name="reviewRef")
	private List<String> reviewRefs = new ArrayList<>();
}