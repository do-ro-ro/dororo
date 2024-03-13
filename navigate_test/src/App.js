import { useEffect } from "react";
// import MapComponent from "./Component/MapComponent";
// import MyComponent from "./Component/MyComponent";
// import RoadMap from "./Component/RoadMap";
// fix
import UseCurrentLocation from "./Component/UseCurrentLocation";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    });
  }, []);

  return (
    <div className="App">
      <div>하위</div>
      {/* <MyComponent /> */}
      {/* <MapComponent /> */}
      {/* <RoadMap></RoadMap> */}
      <UseCurrentLocation />
    </div>
  );
}

export default App;
