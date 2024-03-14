import React, { useEffect } from "react";

const SimpleMap = () => {
  useEffect(() => {
    const initTmap = () => {
      var map = new window.Tmapv2.Map("map_div", {
        center: new window.Tmapv2.LatLng(37.5652045, 126.98702028),
        width: "100%",
        height: "400px",
        zoom: 17,
      });
    };

    initTmap();
  }, []);

  return <div id="map_div"></div>;
};

export default SimpleMap;
