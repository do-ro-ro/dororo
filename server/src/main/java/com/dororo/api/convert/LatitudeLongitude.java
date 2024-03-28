package com.dororo.api.convert;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LatitudeLongitude {
    private double lat;
    private double lng;


//    @JsonCreator
//    public LatitudeLongitude(@JsonProperty("lat") double latitude,
//                             @JsonProperty("lng") double longitude) {
//        this.latitude = latitude;
//        this.longitude = longitude;
//    }

}
