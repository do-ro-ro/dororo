import React, { useState, useEffect } from "react";

function RealTimeCurrentLocation({ setLat, setLng }) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true, // enableHighAccuracy 옵션을 활성화합니다.
            };
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                },
                (error) => {
                    setError(error.message);
                },
                options, // 옵션을 watchPosition() 메서드에 전달합니다.
            );

            return () => {
                // 컴포넌트가 언마운트될 때 위치 추적을 중지합니다.
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    return <div></div>;
}

export default RealTimeCurrentLocation;
