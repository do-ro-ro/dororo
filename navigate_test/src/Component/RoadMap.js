import React, { useEffect } from "react";

const RoadMap = () => {
  var resultMarkerArr = [];
  var resultInfoArr = [];
  useEffect(() => {
    // 1. 지도 띄우기
    const map = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(37.405278291509404, 127.12074279785197),
      width: "100%",
      height: "400px",
      zoom: 14,
      zoomControl: true,
      scrollwheel: true,
    });

    // 2. 시작, 도착 심볼찍기
    // 시작
    const marker_s = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.402688, 127.103259),
      icon: "/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });

    // 도착
    const marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.414382, 127.142571),
      icon: "/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });

    // 3. 경유지 심볼 찍기
    const markers = [
      {
        position: new window.Tmapv2.LatLng(37.399569, 127.10379),
        icon: "/upload/tmap/marker/pin_b_m_1.png",
      },
      {
        position: new window.Tmapv2.LatLng(37.402748, 127.108913),
        icon: "/upload/tmap/marker/pin_b_m_2.png",
      },
      {
        position: new window.Tmapv2.LatLng(37.397153, 127.113403),
        icon: "/upload/tmap/marker/pin_b_m_3.png",
      },
      {
        position: new window.Tmapv2.LatLng(37.410135, 127.12121),
        icon: "/upload/tmap/marker/pin_b_m_4.png",
      },
      {
        position: new window.Tmapv2.LatLng(37.3994, 127.123296),
        icon: "/upload/tmap/marker/pin_b_m_5.png",
      },
      {
        position: new window.Tmapv2.LatLng(37.406327, 127.130933),
        icon: "/upload/tmap/marker/pin_b_m_6.png",
      },
      {
        position: new window.Tmapv2.LatLng(37.413227, 127.127337),
        icon: "/upload/tmap/marker/pin_b_m_7.png",
      },
    ];

    markers.forEach(({ position, icon }) => {
      const marker = new window.Tmapv2.Marker({
        position: position,
        icon: icon,
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });
    });

    // 4. 경로탐색 API 사용요청
    // const routeLayer;
    const btnSelect = document.getElementById("btn_select");
    btnSelect.addEventListener("click", function () {
      const searchOption = document.getElementById("selectLevel").value;

      const headers = {};
      headers["appKey"] = "";
      headers["Content-Type"] = "application/json";

      const param = JSON.stringify({
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
      });

      fetch(
        "https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json",
        {
          method: "POST",
          headers: headers,
          body: param,
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const resultData = response.properties;
          const resultFeatures = response.features;

          // 결과 출력
          const tDistance =
            "총 거리 : " +
            (resultData.totalDistance / 1000).toFixed(1) +
            "km,  ";
          const tTime =
            "총 시간 : " + (resultData.totalTime / 60).toFixed(0) + "분,  ";
          const tFare = "총 요금 : " + resultData.totalFare + "원";

          document.getElementById("result").innerText =
            tDistance + tTime + tFare;

          // 기존 라인 초기화
          resultInfoArr.forEach((info) => info.setMap(null));
          resultInfoArr = [];

          resultFeatures.forEach((feature) => {
            const geometry = feature.geometry;
            const properties = feature.properties;

            if (geometry.type === "LineString") {
              const drawInfoArr = geometry.coordinates.map(([lng, lat]) => {
                const convertPoint =
                  new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    new window.Tmapv2.Point(lng, lat)
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
              resultInfoArr.push(polyline);
            } else {
              const markerImg =
                properties.pointType === "S"
                  ? "/upload/tmap/marker/pin_r_m_s.png"
                  : properties.pointType === "E"
                  ? "/upload/tmap/marker/pin_r_m_e.png"
                  : "http://topopen.tmap.co.kr/imgs/point.png";
              const size =
                properties.pointType === "S" || properties.pointType === "E"
                  ? new window.Tmapv2.Size(24, 38)
                  : new window.Tmapv2.Size(8, 8);

              const latlng = new window.Tmapv2.Point(
                geometry.coordinates[0],
                geometry.coordinates[1]
              );
              const convertPoint =
                new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
              const convertChange = new window.Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );

              const marker = new window.Tmapv2.Marker({
                position: convertChange,
                icon: markerImg,
                iconSize: size,
                map: map,
              });

              resultMarkerArr.push(marker);
            }
          });
        })
        .catch((error) => {
          console.error("API 호출 실패", error);
        });
    });
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  return (
    <div>
      <p id="result"></p>
      <select id="selectLevel">
        <option value="0" selected="selected">
          교통최적+추천
        </option>
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

export default RoadMap;
