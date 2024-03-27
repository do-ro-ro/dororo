import React from "react";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CourseSelectModal from "./CourseSelectModal";

const BottomNav = ({ handlePrev, handleNext }) => {
    const [showCourseSelectModal, setShowCourseSelectModal] = useState(false);

    const openCourseSelectModal = () => {
        setShowCourseSelectModal(true);
    };

    const closeCourseSelectModal = () => {
        setShowCourseSelectModal(false);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                boxShadow: "0 -1px 3px rgba(0,0,0,0.1)", // 상단에 그림자 효과 추가 (선택적)
                zIndex: 1000, // 다른 요소들 위에 렌더링하기 위해 zIndex 설정
                height: "10vh",
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                onClick={handlePrev}
            >
                <UndoIcon sx={{ fontSize: "5vh", color: "#6386BE" }} />
                <Typography variant="caption">이전 코스 보기</Typography>
            </Box>

            <Box
                onClick={openCourseSelectModal}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <DirectionsCarIcon sx={{ fontSize: "6vh", color: "#6386BE" }} />
                <Typography variant="caption">코스 선택</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                onClick={handleNext}
            >
                <RedoIcon sx={{ fontSize: "5vh", color: "#6386BE" }} />
                <Typography variant="caption">다음 코스 보기</Typography>
            </Box>

            <div>
                {showCourseSelectModal && (
                    <CourseSelectModal
                        open={showCourseSelectModal}
                        closeModal={closeCourseSelectModal}
                    />
                )}
            </div>
        </Box>
    );
};

export default BottomNav;
