import { Box } from "@mui/material";
import Drawer from "./Drawer";
import Map from "./Map";
import { useState } from "react";
import FooterBar from "./FooterBar";
import { getCourse } from "../../apis/tmap/getCourse";
import Topbar from "../../components/topbar/Topbar";

function CourseCustomPage() {
    const dummyMap = { map_name: "테스트코스" };
    const [lng] = useState(128.8556740624568);
    const [lat] = useState(35.09355579715464);

    // const course = getCourse;
    const course = [
        {
            lat: 35.09838783539567,
            lng: 128.90464782714886,
        },
        {
            lat: 35.09777316602311,
            lng: 128.9044834541325,
        },
        {
            lat: 35.0922658720723,
            lng: 128.90379711516286,
        },
        {
            lat: 35.09369246305965,
            lng: 128.90446305318602,
        },
        {
            lat: 35.093651682608595,
            lng: 128.90666249689417,
        },
    ];
    return (
        <>
            <Topbar>{dummyMap.map_name} 수정하기</Topbar>
            <Map course={course} lat={lat} lng={lng} />
            <Box position={"absolute"} bottom={"20vw"} mb={20}>
                <Drawer />
            </Box>
            {/* <FooterBar /> */}
        </>
    );
}

export default CourseCustomPage;
