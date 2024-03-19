import React, { useState, useEffect } from 'react';

interface UseCurrentLocationProps {
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLon: React.Dispatch<React.SetStateAction<number>>;
}

const UseCurrentLocation: React.FC<UseCurrentLocationProps> = ({ setLat, setLon }) => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let watchId: number | null = null;

        const getLocation = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        setLat(latitude);
                        setLon(longitude);
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };

    }, [setLat, setLon]);

    return (
        <div>
            {location ? (
                <div>
                    <p>현재 위치:</p>
                    <p>위도: {location.latitude}</p>
                    <p>경도: {location.longitude}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}
        </div>
    );
};

export default UseCurrentLocation;
