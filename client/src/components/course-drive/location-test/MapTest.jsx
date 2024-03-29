import React, { useEffect, useState } from "react";

const MapTest = ({ lat, lng }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    // Tmap 스크립트를 동적으로 로드하는 함수

    // console.log(lat, lon);
    useEffect(() => {
        if (map !== null) {
            // console.log(map._status.center);
            // map._status.center._lat = lat;
            // map._status.center._lng = lon;
            // console.log(map._status.center);
            map.setCenter(new window.Tmapv2.LatLng(lat, lng));

            if (marker) {
                marker.setPosition(new window.Tmapv2.LatLng(lat, lng));
            } else {
                // 새 마커 생성 및 지도에 추가
                const newMarker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(lat, lng),
                    map: map,
                });
                setMarker(newMarker); // 마커 상태 업데이트
            }
        } else {
            initTmap();
            console.log(map);
        }
    }, [lat, lng, map]);
    const initTmap = () => {
        // if (document.getElementById("map_div").querySelector(".tmap")) {
        //     return; // 이미 지도가 있으면 초기화하지 않음
        // }
        const newMap = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(lat, lng),
            width: "100%",
            height: "400px",
            zoom: 15,
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
