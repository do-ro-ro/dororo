package com.dororo.api.db.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)	// 파라미터가 없는 생성자의 무분별한 사용 방지를 위해 ACCESS LEVEL 설정
@Getter
@Table(name = "posts")	// schema 설정 따로 x, public schema 내에 생성됨.
public class PostEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer postId;

	@OneToOne(targetEntity = MapEntity.class)
	@JoinColumn(name = "mapId", nullable = false)
	private MapEntity mapId;
	@Column(nullable = false)
	private String postTitle;
	@Column(nullable = false)
	private String postContent;
	@Column(nullable = false)
	private Timestamp createdAt;
	@Column(nullable = false)
	private Timestamp updatedAt;
	@Column(nullable = false)
	private int scrapCount;
	@Column(nullable = false)
	private String reviewRef;

	@Builder
	public PostEntity(Integer mapId, String postTitle, String postContent) {

	}

}