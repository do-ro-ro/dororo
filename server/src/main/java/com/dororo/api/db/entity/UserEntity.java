package com.dororo.api.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")	// schema 설정 따로 x, public schema 내에 생성됨.
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;

	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String nickname;
	@Column(nullable = false)
	private String profileImage;
	@Column(nullable = false)
	private String uniqueId;
	@Column(nullable = false)
	private String role;

	@Builder
	public UserEntity(Integer userId, String name, String nickname, String profileImage, String uniqueId, String role) {
		this.userId = userId;
		this.name = name;
		this.nickname = nickname;
		this.profileImage = profileImage;
		this.uniqueId = uniqueId;
		this.role = role;
	}
}
