import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SampleCourseImg from "../../assets/sample_course_img.png";
import IntroductionStepper from "./IntroductionStepper";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

function IntroductionModal() {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Modal
                open={open}
                // onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        코스 공유하기
                    </Typography>
                    <Box id="modal-modal-description" sx={{ my: 2 }}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <img width={"200rem"} src={SampleCourseImg} />
                            <IntroductionStepper />
                            <Typography sx={{ mt: 2 }}>기능 설명</Typography>
                        </Box>
                    </Box>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            알겠어요
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default IntroductionModal;
