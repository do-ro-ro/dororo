package com.dororo.api.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.locationtech.jts.geom.LineString;

@Entity
@Table(name = "Maps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MapEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mapId;
    private Integer userId;
    private String mapName;
    private String mapImage;
    @Column(columnDefinition = "geometry(LineString, 4326)")
    private LineString mapRouteAxis;
    @Enumerated(EnumType.STRING)
    private Maptype mapType = Maptype.DEFAULT;
    private Float mapDistance;
    private Integer orginalMapId;
    @ColumnDefault("false")
    private Boolean mapCompletion;


    public enum Maptype{
        DEFAULT, CUMTOM, SCRAP
    }
}
