import React, { useEffect } from "react";

const MyComponent = () => {
  const { kakao } = window;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=";
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao 지도 SDK가 로드된 후 실행될 코드
      kakao.maps.load(() => {
        const roadviewContainer = document.getElementById("roadview");
        const roadview = new kakao.maps.Roadview(roadviewContainer);
        const roadviewClient = new kakao.maps.RoadviewClient();

        const position = new kakao.maps.LatLng(33.450701, 126.570667);

        roadviewClient.getNearestPanoId(position, 50, (panoId) => {
          roadview.setPanoId(panoId, position);

          // 바라보는 방향 설정
          const viewpoint = new kakao.maps.Viewpoint(190, 0, 0); // 예시 값, 실제 필요에 따라 조정
          roadview.setViewpoint(viewpoint);
          console.log(roadview.getViewpoint());
        });
      });
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* 로드뷰를 표시할 div */}
      <div id="roadview" style={{ width: "100%", height: "800px" }}></div>
    </div>
  );
};

export default MyComponent;
