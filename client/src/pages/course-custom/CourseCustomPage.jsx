import { Box } from "@mui/material";
import Drawer from "./Drawer";
import Map from "./Map";
import { useState } from "react";
import FooterBar from "./FooterBar";

function CourseCustomPage() {
    const dummyMap = { map_name: "테스트코스" };
    const [lon] = useState(128.8556740624568);
    const [lat] = useState(35.09355579715464);
    const course = [
        { lon: 128.855674, lat: 35.093555 },
        { lon: 128.859205, lat: 35.093515 },
        { lon: 128.859254, lat: 35.08902 },
        { lon: 128.862074, lat: 35.089101 },
    ];
    return (
        <>
            <Box
                bgcolor={"white"}
                border={"grey"}
                boxShadow="2px"
                textAlign={"center"}
                py="2vh"
            >
                {dummyMap.map_name} 수정하기
            </Box>
            <Map course={course} lat={lat} lon={lon} />
            <Box position={"absolute"} bottom={"20vw"} mb={20}>
                <Drawer />
            </Box>
            {/* <FooterBar /> */}
        </>
    );
}

export default CourseCustomPage;
