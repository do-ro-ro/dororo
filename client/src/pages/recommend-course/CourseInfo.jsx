import { Box, Typography, Button } from "@mui/material";

import { useState } from "react";
import CourseDetailModal from "./CourseDetailModal";

const CourseInfo = ({ courseInfo, currentIndex, locations }) => {
    const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);

    const openCourseDetailModal = () => {
        setShowCourseDetailModal(true);
    };

    const closeCourseDetailModal = () => {
        setShowCourseDetailModal(false);
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "16vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        height: "8vh",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h4"
                        sx={{ fontWeight: 700, ml: 2 }}
                    >
                        코스 {currentIndex + 1}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "8vh",
                        marginX: "2vh",
                        textAlign: "center",
                    }}
                >
                    <Box>
                        <Box>
                            <Typography>주행 시간</Typography>
                            <Typography
                                variant="h5"
                                component="h5"
                                sx={{ fontWeight: 600 }}
                            >
                                {courseInfo.time}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>주행 거리</Typography>
                            <Typography
                                variant="h5"
                                component="h5"
                                sx={{ fontWeight: 600 }}
                            >
                                {courseInfo.distance}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={openCourseDetailModal}
                            sx={{ fontWeight: "bold" }}
                        >
                            경유지 상세
                        </Button>
                    </Box>
                </Box>

                {showCourseDetailModal && (
                    <CourseDetailModal
                        open={showCourseDetailModal}
                        closeModal={closeCourseDetailModal}
                        locations={locations}
                    />
                )}
            </Box>
        </>
    );
};

export default CourseInfo;
