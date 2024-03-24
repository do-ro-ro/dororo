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

const DummyMap = {
    map_id: 0,
    map_name: "코스 샘플 1",
    map_image: SampleCourseImg,
    map_distance: "5.1km",
    map_type: "DEFAULT",
    // map_completion: false,
    map_completion: true,
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

function ShareModal(props) {
    const { open, onClose } = props;
    // const [openShareModal, setOpenShareModal] = useState(open);

    // const handleClose = () => {
    //     setOpenShareModal(false);
    // };
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
                        <Box display={"flex"} justifyContent={"center"}>
                            <img width={"200rem"} src={SampleCourseImg} />
                        </Box>

                        <Typography sx={{ mt: 2 }}>제목</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            size="small"
                            sx={{ width: "20rem" }}
                        />
                        <Typography sx={{ mt: 2 }}>코스 한줄평</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            size="small"
                            multiline={true}
                            sx={{ width: "20rem" }}
                        />
                    </Box>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <Button variant="contained">공유하기</Button>
                        <Button>취소</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default ShareModal;
