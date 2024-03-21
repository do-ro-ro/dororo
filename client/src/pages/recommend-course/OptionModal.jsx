import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

// 모달 스타일 정의
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const OptionModal = ({ open, closeModal }) => {
    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    모달 제목
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    여기에 모달의 내용이 들어갑니다.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={closeModal}>
                    닫기
                </Button>
            </Box>
        </Modal>
    );
};

export default OptionModal;
