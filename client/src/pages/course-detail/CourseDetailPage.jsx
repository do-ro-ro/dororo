import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import { Cancel, CatchingPokemonSharp, CheckCircle } from "@mui/icons-material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import DriveIcon from "../../assets/drive_icon.png";
import Map from "../main-page/Map";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "../../components/community-detail/DeleteDialog";
import ShareModal from "../../components/course-detail/ShareModal";
import { getMapDetail } from "../../apis/server/Map";
import { current } from "@reduxjs/toolkit";

function CourseDetailPage() {
    const { courseId } = useParams();
    const [lat, setLat] = useState(37.5652045);
    const [lng, setLng] = useState(126.98702028);
    const [openShareModal, setOpenShareModal] = useState(false);

    const [currentCourse, setCurrentCourse] = useState(null);

    const handleShareModal = () => {
        setOpenShareModal(true);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMapDetail(courseId);
                const updatedCourse = response;
                // console.log(response);
                setCurrentCourse(updatedCourse);
                // console.log(updatedMapPosts);
                // console.log(currentMapPosts);
            } catch (error) {
                console.error("코스 정보 불러오기 실패", error);
            }
        };

        fetchData();
        console.log(currentCourse);
    }, []);

    return (
        <>
            <Topbar isBackButton={true}>코스 조회하기</Topbar>
            <div className="relative">
                <Paper sx={{ mt: 8 }}>
                    <Stack>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{ p: 2 }}
                        >
                            <Typography variant="h5">
                                {currentCourse
                                    ? currentCourse?.mapName
                                    : "코스 정보 불러오는 중"}
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
                                    {currentCourse?.mapDistance}km
                                </Typography>
                            </Stack>
                            <Stack alignItems={"center"}>
                                <Typography>주행 여부</Typography>
                                {currentCourse?.mapCompletion ? (
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
                                    currentCourse?.mapCompletion ? false : true
                                }
                                onClick={() =>
                                    navigate("custom", { state: currentCourse })
                                }
                            >
                                코스 수정
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ ml: 1 }}
                                disabled={
                                    currentCourse?.mapCompletion ? false : true
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
                    <Map lat={lat} lon={lng} />
                </div>
                <div className="fixed z-50 bottom-2 inset-x-0">
                    <Stack alignItems={"center"}>
                        <Button
                            variant="contained"
                            sx={{ width: "90vw", py: 1 }}
                            onClick={() =>
                                navigate(`drive`, { state: currentCourse })
                            }
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
