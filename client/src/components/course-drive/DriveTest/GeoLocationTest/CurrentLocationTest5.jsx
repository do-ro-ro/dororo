import React, { useState, useEffect } from "react";

const CurrentLocationTest5 = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 위치 정보를 가져오는 함수
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        console.log(latitude);
                        console.log(longitude);
                    },
                    (error) => {
                        setError(error.message);
                    },
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        // 일정 간격으로 위치 정보를 업데이트하려면 아래 주석 해제
        const locationInterval = setInterval(getLocation, 100);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 간격으로 위치 정보를 업데이트하는 것을 중지
        return () => {
            // clearInterval(locationInterval);
        };

        // [] 안에 있는 값이 변경될 때마다 useEffect가 실행됩니다.
    }, []);

    return (
        <div>
            {location ? (
                <div>
                    {/* <p>현재 위치:</p> */}
                    {/* <p>위도: {location.latitude}</p> */}
                    {/* <p>경도: {location.longitude}</p> */}
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}
        </div>
    );
};

export default CurrentLocationTest5;
