import { Box } from "@mui/material";
import Drawer from "./Drawer";
import Map from "./Map";
import { useState } from "react";
import FooterBar from "./FooterBar";

function CourseCustomPage() {
    const dummyMap = { map_name: "테스트코스" };
    const [lat] = useState(35.309216);
    const [lon] = useState(129.033216);
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
            <Map lat={lat} lon={lon} />
            <Drawer />
            {/* <FooterBar /> */}
        </>
    );
}

export default CourseCustomPage;
