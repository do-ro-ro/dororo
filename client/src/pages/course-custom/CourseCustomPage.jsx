import { Box, Button } from "@mui/material";
import Drawer from "./Drawer";
import Map from "./Map";
import { useState } from "react";
import FooterBar from "./FooterBar";
// import { getCourse } from "../../apis/tmap/getCourse";
import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";

function CourseCustomPage() {
    const location = useLocation();
    const currentCourse = location.state;

    return (
        <>
            <Topbar>{currentCourse?.mapName} 수정하기</Topbar>
            <Map course={currentCourse} />
            <Box position={"fixed"} bottom={"0vh"}>
                <Button>코스 수정</Button>
            </Box>
            {/* <Box position={"absolute"} bottom={"20vw"} mb={20}>
                <Drawer />
            </Box> */}
            {/* <FooterBar /> */}
        </>
    );
}

export default CourseCustomPage;
