import React, { useEffect, useState } from "react";
import me_pointer from "../../assets/me_pointer.png";

const Map = ({ lat, lng }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    // Tmap 스크립트를 동적으로 로드하는 함수

    useEffect(() => {
        if (map !== null) {
            map.setCenter(new window.Tmapv2.LatLng(lat, lng));

            if (marker) {
                marker.setPosition(new window.Tmapv2.LatLng(lat, lng));
            } else {
                // 새 마커 생성 및 지도에 추가
                const newMarker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(lat, lng),
                    map: map,
                    icon: me_pointer,
                    iconSize: new window.Tmapv2.Size(36, 57),
                });
                setMarker(newMarker); // 마커 상태 업데이트
            }
        } else {
            initTmap();
            console.log(map);
        }
    }, [lat, lng, map]);
    const initTmap = () => {
        const newMap = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(lat, lng),
            width: "100%",
            height: "100vh",
            zoom: 17,
            zoomControl: true,
            scrollwheel: true,
        });
        setMap(newMap);
    };
    return (
        <div>
            <div id="map_div" />
        </div>
    );
};

export default Map;
