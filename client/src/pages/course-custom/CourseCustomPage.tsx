import { Box } from "@mui/material";
import Drawer from "./Drawer";

function CourseCustomPage() {
    const dummyMap = { map_name: "테스트코스" };
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
            <div>지도 들어갈 영역</div>
            <Drawer />
            <Box>푸터바</Box>
        </>
    );
}

export default CourseCustomPage;
