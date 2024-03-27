import { Modal, Box, Typography, Button } from "@mui/material";

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

const CourseSelectModal = ({ open, closeModal }) => {
    return (
        <>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{ fontWeight: 700, mb: 3 }}
                    >
                        {" "}
                        저장하기
                    </Typography>

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
                        >
                            저장
                        </Button>

                        <Button
                            variant="contained"
                            onClick={closeModal}
                            sx={{
                                fontSize: "1rem",
                                ml: 1,
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

export default CourseSelectModal;
