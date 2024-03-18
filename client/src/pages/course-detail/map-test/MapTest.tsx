import React, { useEffect, useState } from 'react';

interface MapProps {
    lat: number;
    lon: number;
}

interface Tmapv2 {
    Map: any; // Map의 타입을 정확히 알 수 없는 경우에는 any를 사용합니다.
    Marker: any; // Marker의 타입도 마찬가지로 any를 사용합니다.
    LatLng: any;
    // 필요한 다른 메서드나 프로퍼티들도 동일한 방식으로 선언해줍니다.
}

declare global {
    interface Window {
        Tmapv2: Tmapv2;
    }
}

const MapTest: React.FC<MapProps> = ({ lat, lon }) => {
    const [map, setMap] = useState<any>(null); // 여기서 any를 사용하는 것은 Tmap 스크립트의 타입을 정확히 알 수 없기 때문입니다.
    const [marker, setMarker] = useState<any>(null); // 마찬가지로 any를 사용합니다.

    useEffect(() => {
        if (map !== null) {
            map.setCenter(new window.Tmapv2.LatLng(lat, lon));

            if (marker) {
                marker.setPosition(new window.Tmapv2.LatLng(lat, lon));
            } else {
                const newMarker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(lat, lon),
                    map: map,
                });
                setMarker(newMarker);
            }
        } else {
            initTmap();
        }
    }, [lat, lon, map, marker]);

    const initTmap = () => {
        const newMap = new window.Tmapv2.Map('map_div', {
            center: new window.Tmapv2.LatLng(lat, lon),
            width: '100%',
            height: '915px',
            zoom: 19,
        });
        setMap(newMap);
    };

    return (
        <div>
            <div id="map_div" />
        </div>
    );
};

export default MapTest;