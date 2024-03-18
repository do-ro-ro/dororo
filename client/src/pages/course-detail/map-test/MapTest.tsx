import React, { useEffect, useState } from 'react';

interface MapProps {
    lat: number;
    lon: number;
}

interface Tmapv2 {
    Map: any;
    Marker: any;
    LatLng: any;
}

declare global {
    interface Window {
        Tmapv2: Tmapv2;
    }
}

const MapTest: React.FC<MapProps> = ({ lat, lon }) => {
    const [map, setMap] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);

    useEffect(() => {
        if (map === null) {
            initTmap();
        } else {
            if (marker === null) {
                const newMarker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(lat, lon),
                    map: map,
                });
                setMarker(newMarker);
            } else {
                marker.setPosition(new window.Tmapv2.LatLng(lat, lon));
            }
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
