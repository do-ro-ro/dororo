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
	private String writerUniqueId;	// Users(UserEntity) 테이블의 uniqueId, 외래키는 설정 안해줌
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
	public PostEntity(MapEntity mapId, String writerUniqueId, String postTitle, String postContent, String reviewRef) {
		this.mapId = mapId;
		this.writerUniqueId = writerUniqueId;
		this.postTitle = postTitle;
		this.postContent = postContent;
		this.scrapCount = 0;
		this.reviewRef = reviewRef;
	}

	@PrePersist
	protected void onCreate() {	// 데이터베이스에 저장되기 전 시점에 실행되는 메서드
		Timestamp now = new Timestamp(System.currentTimeMillis());	// 그때의 시간을 받아옴
		this.createdAt = now;
		this.updatedAt = now;
	}

	@PreUpdate
	protected void onUpdate() {	// 엔티티가 업데이트 되는 시점에 실행되는 메서드
		this.updatedAt = new Timestamp(System.currentTimeMillis());
	}

	public void modifyScrapCount(String mode) {
		if (mode.equals("PLUS")) this.scrapCount += 1;
		else {
			if (this.scrapCount > 0) this.scrapCount -= 1;	// 스크랩 수가 0이하일 때 혹시 모를 스크랩 카운트 음수화 방지
		}
	}

}