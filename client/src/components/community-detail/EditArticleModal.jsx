import {
    Box,
    Button,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import SampleCourseImg from "../../assets/sample_course_img.png";

const DummyCourse = {
    post_id: 0,
    post_title: "코스 샘플 1",
    post_content: "내용",
    updated_at: "2024-03-21",
    scrap_count: 10,
    user_id: 1,
};

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

function EditArticleModal() {
    // EditModal 상태 관리
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="contained"
                size="small"
                sx={{ height: "3vh", width: "3vw", mx: 0.3 }}
                onClick={handleOpen}
            >
                수정
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        게시물 수정
                    </Typography>
                    <Box id="modal-modal-description" sx={{ my: 2 }}>
                        <Box display={"flex"} justifyContent={"center"}>
                            <img width={"200rem"} src={SampleCourseImg} />
                        </Box>

                        <Typography sx={{ mt: 2 }}>제목</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            defaultValue={DummyCourse.post_title}
                            size="small"
                        />
                        <Typography sx={{ mt: 2 }}>내용</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            defaultValue={DummyCourse.post_content}
                            size="small"
                            multiline={true}
                            sx={{ width: "20rem" }}
                        />
                    </Box>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <Button variant="contained">수정하기</Button>
                        <Button>취소</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default EditArticleModal;
