package com.dororo.api.convert;

import jakarta.persistence.NamedNativeQuery;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LatitudeLongitude {
    private double lat;
    private double lng;
}
