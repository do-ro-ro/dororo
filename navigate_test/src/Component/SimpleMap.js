import React, { useEffect, useState } from "react";
import doro from "../assets/img/dodo.PNG";

const SimpleMap = ({ lat, lon, time }) => {
  let [map, setMap] = useState(null);
  const [resultMarkerArr, setResultMarkerArr] = useState([]);
  const [resultInfoArr, setResultInfoArr] = useState([]);

  useEffect(() => {
    console.log(lat);
    console.log(lon);
    if (map !== null) {
      map._status.center._lat = lat;
      map._status.center._lng = lon;
      console.log(map._status.center._lat);
      console.log(map._status.center._lng);
    } else {
      initTmap();
    }
  }, [lat, lon]);

  const initTmap = () => {
    setResultMarkerArr([]);

    map = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(lat, lon),
      width: "100%",
      height: "500px",
      zoom: 19,
      zoomControl: true,
      scrollwheel: true,
    });

    setMap(map);

    const start = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(lat, lon),
      icon: doro,
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });
    setResultMarkerArr((prev) => [...prev, start]);

    const marker_s = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.402688, 127.103259),
      icon: "",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });
    setResultMarkerArr((prev) => [...prev, marker_s]);

    const marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.414382, 127.142571),
      icon: "/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });
    setResultMarkerArr((prev) => [...prev, marker_e]);

    const waypoints = [
      {
        lat: 37.399569,
        lng: 127.10379,
        icon: "/upload/tmap/marker/pin_b_m_1.png",
      },
      {
        lat: 37.402748,
        lng: 127.108913,
        icon: "/upload/tmap/marker/pin_b_m_2.png",
      },
      {
        lat: 37.397153,
        lng: 127.113403,
        icon: "/upload/tmap/marker/pin_b_m_3.png",
      },
      {
        lat: 37.410135,
        lng: 127.12121,
        icon: "/upload/tmap/marker/pin_b_m_4.png",
      },
      {
        lat: 37.3994,
        lng: 127.123296,
        icon: "/upload/tmap/marker/pin_b_m_5.png",
      },
      {
        lat: 37.406327,
        lng: 127.130933,
        icon: "/upload/tmap/marker/pin_b_m_6.png",
      },
      {
        lat: 37.413227,
        lng: 127.127337,
        icon: "/upload/tmap/marker/pin_b_m_7.png",
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

    document.getElementById("btn_select").addEventListener("click", () => {
      const searchOption = document.getElementById("selectLevel").value;

      const headers = {
        appKey: "biTbgqZv225ydagowr17d9sD74C6uMF55JjTMkOT",
        "Content-Type": "application/json",
      };

      const param = {
        startName: "출발지",
        startX: "127.103259",
        startY: "37.402688",
        startTime: "201708081103",
        endName: "도착지",
        endX: "127.142571",
        endY: "37.414382",
        viaPoints: [
          {
            viaPointId: "test01",
            viaPointName: "name01",
            viaX: "127.103790",
            viaY: "37.399569",
          },
          {
            viaPointId: "test02",
            viaPointName: "name02",
            viaX: "127.108913",
            viaY: "37.402748",
          },
          {
            viaPointId: "test03",
            viaPointName: "name03",
            viaX: "127.113403",
            viaY: "37.397153",
          },
          {
            viaPointId: "test04",
            viaPointName: "name04",
            viaX: "127.121210",
            viaY: "37.410135",
          },
          {
            viaPointId: "test05",
            viaPointName: "name05",
            viaX: "127.123296",
            viaY: "37.399400",
          },
          {
            viaPointId: "test06",
            viaPointName: "name06",
            viaX: "127.130933",
            viaY: "37.406327",
          },
          {
            viaPointId: "test07",
            viaPointName: "name07",
            viaX: "127.127337",
            viaY: "37.413227",
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
        }
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
            "총 시간 : " + (resultData.totalTime / 60).toFixed(0) + "분,  ";
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
              const drawInfoArr = geometry.coordinates.map((coord) => {
                const latlng = new window.Tmapv2.Point(coord[0], coord[1]);
                const convertPoint =
                  new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlng
                  );
                return new window.Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
                );
              });

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
                markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                size = new window.Tmapv2.Size(8, 8);
              }

              const latlon = new window.Tmapv2.Point(
                geometry.coordinates[0],
                geometry.coordinates[1]
              );
              const convertPoint =
                new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
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
      {/* {lat} */}
      {/* {lon} */}
      {time}
    </div>
  );
};

export default SimpleMap;
