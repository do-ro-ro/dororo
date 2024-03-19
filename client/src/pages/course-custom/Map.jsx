import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function Map({ lat, lon }) {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const initTmap = () => {
            const newMap = new window.Tmapv2.Map("map_div", {
                center: new window.Tmapv2.LatLng(lat, lon),
                width: "100vw",
                height: "80vh",
                zoom: 14,
            });
            setMap(newMap);

            // 가운데에 마커 추가
            const centerMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lon),
                map: newMap,
            });
            setMarker(centerMarker);
        };

        const updateMap = () => {
            if (map !== null) {
                map.setCenter(new window.Tmapv2.LatLng(lat, lon));

                if (marker !== null) {
                    marker.setPosition(new window.Tmapv2.LatLng(lat, lon));
                }
            } else {
                initTmap();
            }
        };

        updateMap();
    }, [lat, lon, map, marker]);

    return (
        <>
            <Box>
                <div id="map_div" />
            </Box>
        </>
    );
}

export default Map;
