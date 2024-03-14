import { useEffect, useState } from "react";
import Map from "./Component/Map";
// import MapComponent from "./Component/MapComponent";
import SimpleMap from "./Component/SimpleMap";
// import MyComponent from "./Component/MyComponent";
// import RoadMap from "./Component/RoadMap";
// fix
import UseCurrentLocation from "./Component/UseCurrentLocation";

function App() {
  const [lat, setLat] = useState(35.1010816);
  const [lon, setLon] = useState(128.8503296);
  const [time, setTime] = useState(0);
  return (
    <div className="App">
      <div>하위</div>
      {/* {console.log(process.env.REACT_APP_API_KEY)} */}

      {/* <MyComponent /> */}
      {/* <MapComponent /> */}
      {/* <RoadMap></RoadMap> */}
      <UseCurrentLocation setLat={setLat} setLon={setLon} setTime={setTime} />
      <SimpleMap lat={lat} lon={lon} time={time} />
      {lat}
      <div></div>
      {/* <Map></Map> */}
      {lon}
      <div></div>
      {time}
    </div>
  );
}

export default App;
