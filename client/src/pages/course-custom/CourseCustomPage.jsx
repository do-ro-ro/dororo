import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Drawer from "./Drawer";
import Map from "./Map";
import { useState } from "react";
import FooterBar from "./FooterBar";
// import { getCourse } from "../../apis/tmap/getCourse";
import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "4px solid #6386BE",
    boxShadow: 24,
    p: 4,
};

function CourseCustomPage() {
    const location = useLocation();
    const currentCourse = location.state;
    const [showCourseSaveModal, setShowCourseSaveModal] = useState(false);
    const [courseName, setCourseName] = useState("");

    const [toSave, setToSave] = useState(false);

    const openCourseSaveModal = () => {
        setShowCourseSaveModal(true);
    };

    const closeCourseSaveModal = () => {
        setShowCourseSaveModal(false);
    };

    return (
        <>
            <Topbar isBackButton={true}>
                {currentCourse?.mapName} 수정하기
            </Topbar>
            <Map
                course={currentCourse}
                courseName={courseName}
                toSave={toSave}
            />
            <Box position={"fixed"} bottom={"0vh"}>
                <Button onClick={openCourseSaveModal}>코스 수정</Button>
                <Modal
                    open={showCourseSaveModal}
                    onClose={closeCourseSaveModal}
                >
                    <Box sx={style}>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{ fontWeight: 700 }}
                        >
                            저장하기
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "0.75rem", // 더 작은 글씨
                                color: "grey.600", // 회색
                                mb: 3,
                            }}
                        >
                            코스 이름을 정해주세요! 마이페이지에 저장됩니다.
                        </Typography>

                        <Box>
                            <TextField
                                id="standard-basic"
                                label="코스명을 입력해주세요"
                                variant="standard"
                                onChange={(e) => setCourseName(e.target.value)}
                                sx={{
                                    width: "100%",
                                    mb: 3,
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: "1.25rem", // 입력 필드의 폰트 크기 늘리기
                                    },
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: "0.85rem", // 라벨 폰트 크기 줄이기
                                    },
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                mt: 4,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: "1rem",
                                    mr: 1,
                                }}
                                onClick={() => {
                                    setToSave(true);
                                }}
                            >
                                저장
                            </Button>

                            <Button
                                variant="contained"
                                onClick={closeCourseSaveModal}
                                sx={{
                                    fontSize: "1rem",
                                    ml: 1,
                                    backgroundColor: "#9e9e9e",
                                }}
                            >
                                닫기
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
            {/* <Box position={"absolute"} bottom={"20vw"} mb={20}>
                <Drawer />
            </Box> */}
            {/* <FooterBar /> */}
        </>
    );
}

export default CourseCustomPage;
