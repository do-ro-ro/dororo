import React, { useEffect, useState } from "react";

const SimpleMap = ({ lat, lng, coolList, fillterList, setFillterList }) => {
    let [map, setMap] = useState(null);
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);

    useEffect(() => {
        if (coolList.length > 1) {
            setFillterList(coolList.slice(1, coolList.length - 1));
            console.log(fillterList.length);

            // initTmap();
            //
        }
    }, [coolList]);

    const initTmap = () => {
        if (map !== null) {
            return;
        }
        setResultMarkerArr([]);

        map = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(lat, lng),
            width: "100%",
            height: "400px",
            zoom: 14,
            zoomControl: true,
            scrollwheel: true,
        });

        setMap(map);
        // 출발지
        const marker_s = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                coolList[0].lat,
                coolList[0].lon,
            ),
            icon: "/upload/tmap/marker/pin_r_m_s.png",
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_s]);

        const marker_e = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                coolList[coolList.length - 1].lat,
                coolList[coolList.length - 1].lon,
            ),
            icon: "/upload/tmap/marker/pin_r_m_e.png",
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_e]);

        const waypoints = fillterList.map((point, index) => ({
            lat: point.lat,
            lng: point.lon,
            icon: `/upload/tmap/marker/pin_b_m_${index + 1}.png`,
        }));

        waypoints.forEach((waypoint) => {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(waypoint.lat, waypoint.lng),
                icon: waypoint.icon,
                iconSize: new window.Tmapv2.Size(24, 38),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, marker]);
        });

        document.getElementById("btn_select").addEventListener("click", () => {
            const headers = {
                appKey: import.meta.env.VITE_TMAP_API_KEY,
                "Content-Type": "application/json",
            };

            const param = {
                startName: "출발지",
                startX: coolList[0].lon.toString(),
                startY: coolList[0].lat.toString(),
                startTime: "201708081103",
                endName: "도착지",
                endX: coolList[coolList.length - 1].lon.toString(),
                endY: coolList[coolList.length - 1].lat.toString(),
                viaPoints: fillterList.map((point) => ({
                    viaPointId: `test${fillterList.indexOf(point) + 1}`,
                    viaPointName: `name${fillterList.indexOf(point) + 1}`,
                    viaX: point.lon.toString(),
                    viaY: point.lat.toString(),
                })),
                reqCoordType: "WGS84GEO",
                resCoordType: "EPSG3857",
                searchOption: 1,
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
        });
    };

    return (
        <div>
            <p id="result"></p>
            {/* <select id="selectLevel">
                <option value="0">교통최적+추천</option>
                <option value="1">교통최적+무료우선</option>
                <option value="2">교통최적+최소시간</option>
                <option value="3">교통최적+초보</option>
            </select> */}
            <button id="btn_select">적용하기</button>
            <button
                onClick={() => {
                    initTmap();
                }}
            >
                클릭
            </button>
            <div id="map_wrap" className="map_wrap">
                <div id="map_div"></div>
            </div>
        </div>
    );
};

export default SimpleMap;
