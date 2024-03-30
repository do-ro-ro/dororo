import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const CurrentLocation = ({ setLat, setLng, setTimestamp }) => {
    // 위치 정보를 가져오고 상태를 업데이트하는 함수
    const fetchCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setTimestamp(position.timestamp);
            console.log(position);
        });
    };
    return (
        <div className="w-10 h-10 z-1 ">
            <button onClick={fetchCurrentPosition}>
                <GpsFixedIcon sx={{ color: "#6389BE", fontSize: "40px" }} />
            </button>
        </div>
    );
};

export default CurrentLocation;
