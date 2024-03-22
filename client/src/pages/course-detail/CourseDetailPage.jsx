import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import { Cancel, CheckCircle } from "@mui/icons-material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import DriveIcon from "../../assets/drive_icon.png";

const DummyMap = {
    map_id: 0,
    map_name: "코스 샘플 1",
    map_image: SampleCourseImg,
    map_distance: "5.1km",
    map_type: "DEFAULT",
    map_completion: false,
    // map_completion: true
};

function CourseDetailPage() {
    return (
        <>
            <Box>
                <Topbar>코스 조회하기</Topbar>
                <Paper>
                    <Stack>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{ p: 2 }}
                        >
                            <Typography variant="h5">
                                {DummyMap.map_name}
                            </Typography>
                            <Button>삭제</Button>
                        </Stack>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-around"}
                            sx={{ p: 2 }}
                        >
                            <Stack alignItems={"center"}>
                                <Typography>주행 거리</Typography>
                                <Typography variant="h5">
                                    {DummyMap.map_distance}
                                </Typography>
                            </Stack>
                            <Stack alignItems={"center"}>
                                <Typography>주행 여부</Typography>
                                {DummyMap.map_completion ? (
                                    <CheckCircle
                                        sx={{ width: "20vw", height: "5vh" }}
                                        color="success"
                                    />
                                ) : (
                                    <Cancel
                                        sx={{ width: "20vw", height: "5vh" }}
                                        color="error"
                                    />
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
                <img width={"100%"} src={DummyMap.map_image} />
                <Stack alignItems={"center"}>
                    <Button variant="contained" sx={{ width: "90vw", py: 1 }}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <img src={DriveIcon} />
                            <Typography variant="h4" sx={{ ml: 1 }}>
                                주행하기
                            </Typography>
                        </Stack>
                    </Button>
                </Stack>
            </Box>
        </>
    );
}

export default CourseDetailPage;
