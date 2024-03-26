import React, { useEffect, useState } from "react";

const StopOverTest = ({ lat, lon }) => {
    let [map, setMap] = useState(null);
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [marker, setMarker] = useState(null);
    const [resultInfoArr, setResultInfoArr] = useState([]);

    useEffect(() => {
        if (map !== null) {
            // console.log(map._status.center);
            // map._status.center._lat = lat;
            // map._status.center._lng = lon;
            // console.log(map._status.center);
            map.setCenter(new window.Tmapv2.LatLng(lat, lon));

            if (marker) {
                marker.setPosition(new window.Tmapv2.LatLng(lat, lon));
            } else {
                // 새 마커 생성 및 지도에 추가
                const newMarker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(lat, lon),
                    map: map,
                });
                setMarker(newMarker); // 마커 상태 업데이트
            }
        } else {
            initTmap();
            // console.log(map);
        }
    }, [lat, lon, map]);

    const initTmap = () => {
        setResultMarkerArr([]);

        map = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(
                37.405278291509404,
                127.12074279785197,
            ),
            width: "50%",
            height: "200px",
            zoom: 14,
            zoomControl: true,
            scrollwheel: true,
        });

        setMap(map);

        const marker_s = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                35.093581367865145,
                128.85391060747438,
            ),
            icon: "/upload/tmap/marker/pin_r_m_s.png",
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_s]);

        const marker_e = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                35.093569211441846,
                128.84632638878415,
            ),
            icon: "/upload/tmap/marker/pin_r_m_e.png",
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_e]);

        const waypoints = [
            {
                lat: 35.09357683627743,
                lng: 128.85288707526908,
                icon: "/upload/tmap/marker/pin_b_m_1.png",
            },
            {
                lat: 35.095354648743836,
                lng: 128.85267551401856,
                icon: "/upload/tmap/marker/pin_b_m_2.png",
            },
            {
                lat: 35.095752023745675,
                lng: 128.8516140762177,
                icon: "/upload/tmap/marker/pin_b_m_3.png",
            },
            {
                lat: 35.09579761764295,
                lng: 128.84956070168465,
                icon: "/upload/tmap/marker/pin_b_m_4.png",
            },
            {
                lat: 35.09382202426886,
                lng: 128.8491662634337,
                icon: "/upload/tmap/marker/pin_b_m_5.png",
            },
        ];

        waypoints.forEach((waypoint) => {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(waypoint.lat, waypoint.lng),
                icon: waypoint.icon,
                iconSize: new window.Tmapv2.Size(24, 38),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, marker]);
        });

        const searchOption = document.getElementById("selectLevel").value;

        const headers = {
            appKey: "biTbgqZv225ydagowr17d9sD74C6uMF55JjTMkOT",
            "Content-Type": "application/json",
        };

        const param = {
            startName: "출발지",
            startX: "128.85391060747438",
            startY: "35.093581367865145",
            startTime: "201708081103",
            endName: "도착지",
            endX: "128.84632638878415",
            endY: "35.093569211441846",
            viaPoints: [
                {
                    viaPointId: "test01",
                    viaPointName: "name01",
                    viaX: "128.85288707526908",
                    viaY: "35.09357683627743",
                },
                {
                    viaPointId: "test02",
                    viaPointName: "name02",
                    viaX: "128.85267551401856",
                    viaY: "35.095354648743836",
                },
                {
                    viaPointId: "test03",
                    viaPointName: "name03",
                    viaX: "128.8516140762177",
                    viaY: "35.095752023745675",
                },
                {
                    viaPointId: "test04",
                    viaPointName: "name04",
                    viaX: "128.84956070168465",
                    viaY: "35.09579761764295",
                },
                {
                    viaPointId: "test05",
                    viaPointName: "name05",
                    viaX: "128.8491662634337",
                    viaY: "35.09382202426886",
                },
            ],
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            searchOption: searchOption,
        };

        fetch(
            "https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(param),
            },
        )
            .then((response) => response.json())
            .then((data) => {
                const resultData = data.properties;
                const resultFeatures = data.features;

                const tDistance =
                    "총 거리 : " +
                    (resultData.totalDistance / 1000).toFixed(1) +
                    "km,  ";
                const tTime =
                    "총 시간 : " +
                    (resultData.totalTime / 60).toFixed(0) +
                    "분,  ";
                const tFare = "총 요금 : " + resultData.totalFare + "원";

                document.getElementById("result").innerText =
                    tDistance + tTime + tFare;

                if (resultInfoArr.length > 0) {
                    resultInfoArr.forEach((info) => info.setMap(null));
                    setResultInfoArr([]);
                }

                resultFeatures.forEach((feature) => {
                    const geometry = feature.geometry;
                    const properties = feature.properties;

                    if (geometry.type === "LineString") {
                        const drawInfoArr = geometry.coordinates.map(
                            (coord) => {
                                const latlng = new window.Tmapv2.Point(
                                    coord[0],
                                    coord[1],
                                );
                                const convertPoint =
                                    new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                        latlng,
                                    );
                                return new window.Tmapv2.LatLng(
                                    convertPoint._lat,
                                    convertPoint._lng,
                                );
                            },
                        );

                        const polyline = new window.Tmapv2.Polyline({
                            path: drawInfoArr,
                            strokeColor: "#FF0000",
                            strokeWeight: 6,
                            map: map,
                        });

                        setResultInfoArr((prev) => [...prev, polyline]);
                    } else {
                        let markerImg = "";
                        let size = "";

                        if (properties.pointType === "S") {
                            markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                            size = new window.Tmapv2.Size(24, 38);
                        } else if (properties.pointType === "E") {
                            markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                            size = new window.Tmapv2.Size(24, 38);
                        } else {
                            markerImg =
                                "http://topopen.tmap.co.kr/imgs/point.png";
                            size = new window.Tmapv2.Size(8, 8);
                        }

                        const latlon = new window.Tmapv2.Point(
                            geometry.coordinates[0],
                            geometry.coordinates[1],
                        );
                        const convertPoint =
                            new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                latlon,
                            );

                        const marker = new window.Tmapv2.Marker({
                            position: new window.Tmapv2.LatLng(
                                convertPoint._lat,
                                convertPoint._lng,
                            ),
                            icon: markerImg,
                            iconSize: size,
                            map: map,
                        });

                        setResultMarkerArr((prev) => [...prev, marker]);
                    }
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <p id="result"></p>
            <select id="selectLevel">
                <option value="0">교통최적+추천</option>
                <option value="1">교통최적+무료우선</option>
                <option value="2">교통최적+최소시간</option>
                <option value="3">교통최적+초보</option>
            </select>
            <button id="btn_select">적용하기</button>

            <div id="map_wrap" className="map_wrap">
                <div id="map_div"></div>
            </div>
        </div>
    );
};

export default StopOverTest;
