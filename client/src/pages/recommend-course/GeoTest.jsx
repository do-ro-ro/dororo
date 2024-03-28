import React, { useEffect, useState } from "react";

const GeoTest = () => {
    const [googleLat, setGoogleLat] = useState(0);
    const [googleLon, setGoogleLon] = useState(0);
    const [check, setCheck] = useState(0);
    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch(
                    "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDRwEdn-2_pYpfVsE70a1qAPehbvvbs-yU",
                    {
                        method: "POST",
                        body: JSON.stringify({ considerIp: true }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                const data = await response.json();
                setGoogleLat(data.location.lat);
                setGoogleLon(data.location.lng);
            } catch (error) {
                console.error("Geolocation API error:", error);
            }
        };

        // 주기적으로 위치 정보를 갱신하기 위해 setInterval 사용
        const intervalId = setInterval(() => {
            setCheck(check + 1);
            console.log(check);
            getLocation();
        }, 1000); // 4초마다 위치 갱신

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 중단
    }, []);

    return (
        <>
            <div>구글</div>
            <div>lat: {googleLat}</div>
            <div>lon: {googleLon}</div>
        </>
    );
};

export default GeoTest;
