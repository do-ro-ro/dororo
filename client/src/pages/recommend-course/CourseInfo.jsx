import { Box, Typography, Button, Paper } from "@mui/material";

import { useState } from "react";
import CourseDetailModal from "./CourseDetailModal";

const CourseInfo = ({ courseInfo, currentIndex, courseNode }) => {
    const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);

    const openCourseDetailModal = () => {
        setShowCourseDetailModal(true);
    };

    const closeCourseDetailModal = () => {
        setShowCourseDetailModal(false);
    };

    return (
        <Box>
            <Box
                sx={{
                    position: "absolute",
                    top: "50px",
                    left: 0,
                    right: 0,
                    zIndex: 5,
                    backgroundColor: "#FFFFFF",
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
                        courseNode={courseNode}
                    />
                )}
            </Box>
        </Box>
    );
};

export default CourseInfo;
