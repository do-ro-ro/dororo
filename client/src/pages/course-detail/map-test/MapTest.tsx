import React, { useEffect, useState } from 'react';

// Window 객체에 대한 TypeScript 선언
declare global {
    interface Window {
        Tmapv2: {
            Map: any; // Map 클래스의 타입
            Marker: any; // Marker 클래스의 타입
            LatLng: any; // LatLng 클래스의 타입
        };
    }
}

interface MapTestProps {
    lat: number;
    lon: number;
}

const MapTest: React.FC<MapTestProps> = ({ lat, lon }) => {
    const [map, setMap] = useState<Window['Tmapv2']['Map'] | null>(null);
    const [marker, setMarker] = useState<Window['Tmapv2']['Marker'] | null>(null);

    useEffect(() => {
        const initTmap = () => {
            const newMap = new window.Tmapv2.Map('map_div', {
                center: new window.Tmapv2.LatLng(lat, lon),
                width: '100%',
                height: '915px',
                zoom: 19,
            });
            setMap(newMap);
            
            const newMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lon),
                map: newMap,
            });
            setMarker(newMarker);
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
        <div>
            <div id="map_div" />
        </div>
    );
};

export default MapTest;
