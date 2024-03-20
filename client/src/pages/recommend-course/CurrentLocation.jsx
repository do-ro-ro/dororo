const CurrentLocation = ({ setLat, setLon, setTimestamp }) => {
    // 위치 정보를 가져오고 상태를 업데이트하는 함수
    const fetchCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            setTimestamp(position.timestamp);
            console.log(position);
        });
    };
    return (
        <div>
            <button onClick={fetchCurrentPosition}>Get Current Location</button>
        </div>
    );
};

export default CurrentLocation;
