import { Modal, Box, Typography, Button } from "@mui/material";

import { useEffect } from "react";
import CourseDetailInfo from "./CourseDetailInfo";

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

const CourseDetailModal = ({ open, closeModal, courseNode }) => {
    useEffect(() => {
        console.log(courseNode);
    }, [courseNode]);
    return (
        <>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{ fontWeight: 700, mb: 3 }}
                    >
                        경유지 상세
                    </Typography>

                    <Box>
                        <CourseDetailInfo courseNode={courseNode} />
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
                            onClick={closeModal}
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            닫기
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default CourseDetailModal;
