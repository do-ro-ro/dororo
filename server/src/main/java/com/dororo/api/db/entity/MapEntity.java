package com.dororo.api.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.locationtech.jts.geom.LineString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "maps")	// schema 설정 따로 x, public schema 내에 생성됨.
public class MapEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mapId;

    @ManyToOne(targetEntity = UserEntity.class) @JoinColumn(name="userId", nullable = false)
    private UserEntity userId;
    @Column(nullable = false)
    private String mapName;
    @Column(nullable = false) @ColumnDefault("''")  // 이미지 없을 경우 빈 스트링으로
    private String mapImage;
    @Column(nullable = false, columnDefinition = "geometry(LineString, 4326)")
    private LineString originMapRouteAxis;    // 원본 좌표
    @Column(nullable = false, columnDefinition = "geometry(LineString, 4326)")
    private LineString convertedMapRouteAxis;  // 변환된 좌표
    @Column(nullable = false) @Enumerated(EnumType.STRING)
    private Maptype mapType = Maptype.DEFAULT;
    @Column(nullable = false)
    private Float mapDistance;
    //default = 0 , 원본 맵 삭제 시 -1
    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer originalMapId;
    @Column(nullable = false) @ColumnDefault("false")
    private Boolean mapCompletion;

    public enum Maptype{
        DEFAULT, CUSTOM, SCRAP
    }

}
