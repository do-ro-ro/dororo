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
import Map from "../recommend-course/Map";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/community-detail/DeleteDialog";
import ShareModal from "../../components/course-detail/ShareModal";

const DummyMap = {
    map_id: 0,
    map_name: "코스 샘플 1",
    map_image: SampleCourseImg,
    map_distance: "5.1km",
    map_type: "DEFAULT",
    // map_completion: false,
    map_completion: true,
};

function CourseDetailPage() {
    const [lat, setLat] = useState(37.5652045);
    const [lon, setLon] = useState(126.98702028);
    const [openShareModal, setOpenShareModal] = useState(false);

    const handleShareModal = () => {
        setOpenShareModal(true);
        console.log("열려라 모달!");
    };

    const navigate = useNavigate();
    return (
        <>
            <div className="relative">
                <Topbar isBackButton={true}>코스 조회하기</Topbar>
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
                            <DeleteDialog variant={"course"} />
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
                <div className="relative">
                    <div className="absolute z-50 top-1 left-0  m-4">
                        <Stack direction={"row"}>
                            <Button
                                variant="contained"
                                sx={{}}
                                disabled={
                                    DummyMap.map_completion ? false : true
                                }
                                onClick={() => navigate("custom")}
                            >
                                코스 수정
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ ml: 1 }}
                                disabled={
                                    DummyMap.map_completion ? false : true
                                }
                                onClick={handleShareModal}
                            >
                                공유하기
                            </Button>
                            <ShareModal
                                open={openShareModal}
                                onClose={() => setOpenShareModal(false)}
                            />
                        </Stack>
                    </div>
                    <Map lat={lat} lon={lon} />
                </div>
                <div className="fixed z-50 bottom-2 inset-x-0">
                    <Stack alignItems={"center"}>
                        <Button
                            variant="contained"
                            sx={{ width: "90vw", py: 1 }}
                            onClick={() => navigate(`drive`)}
                        >
                            <Stack direction={"row"} alignItems={"center"}>
                                <img src={DriveIcon} />
                                <Typography variant="h4" sx={{ ml: 1 }}>
                                    주행하기
                                </Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default CourseDetailPage;
