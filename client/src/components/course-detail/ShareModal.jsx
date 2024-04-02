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
import { createMapPosts } from "../../apis/server/Community";
import { useNavigate, useParams } from "react-router-dom";

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

function ShareModal(props) {
    const { courseId } = useParams();
    const mapId = Number(courseId);
    const { open, onClose } = props;
    const [openShareModal, setOpenShareModal] = useState(false);
    const navigate = useNavigate();

    const [inputPostTitle, setInputPostTitle] = useState("");
    const [inputPostContent, setInputPostContent] = useState("");

    const handleCreatePost = async () => {
        const response = await createMapPosts(
            mapId,
            inputPostTitle,
            inputPostContent,
        );
        if (response?.status === 200) {
            navigate("/main/community");
        } else if (response?.status === 409) {
            alert("이미 공유된 코스입니다");
        }
    };
    const handleClose = () => {
        setOpenShareModal(false);
    };
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
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
                        <Typography sx={{ mt: 2 }}>제목</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            size="small"
                            sx={{ width: "20rem" }}
                            onChange={(event) => {
                                setInputPostTitle(event.target.value);
                            }}
                        />
                        <Typography sx={{ mt: 2 }}>코스 한줄평</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            size="small"
                            multiline={true}
                            sx={{ width: "20rem" }}
                            onChange={(event) => {
                                setInputPostContent(event.target.value);
                            }}
                        />
                    </Box>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <Button variant="contained" onClick={handleCreatePost}>
                            공유하기
                        </Button>
                        <Button onClick={onClose}>취소</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default ShareModal;
