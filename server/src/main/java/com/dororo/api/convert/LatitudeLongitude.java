package com.dororo.api.convert;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LatitudeLongitude {
    private double latitude;
    private double longitude;

    public LatitudeLongitude(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }


}
