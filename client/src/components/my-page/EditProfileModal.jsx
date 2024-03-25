import { BorderColor } from "@mui/icons-material";
import {
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { useState } from "react";
import BasicProfile from "../../assets/user_profile_basic.png";
import CameraButton from "../../assets/camera_btn.png";

const DummyUser = {
    user_id: 1,
    name: "김싸피",
    nickname: "녹산동레이서",
    profile_image: BasicProfile,
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: "white",
}));

function EditProfileModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <IconButton color="primary" onClick={handleOpen}>
                <BorderColor />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        sx={{ mb: 4 }}
                    >
                        {/* <img src={BasicProfile} width={"60vw"} /> */}
                        {/* 나중에 Avatar로 바꿔주고, 파일 불러오기 버튼도 넣어야 함. */}
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            badgeContent={
                                <SmallAvatar
                                    alt="camera_btn"
                                    src={CameraButton}
                                />
                            }
                        >
                            <Avatar
                                alt="profile"
                                src={DummyUser.profile_image}
                                sx={{ width: "4rem", height: "4rem" }}
                            />
                        </Badge>
                    </Box>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        프로필 수정
                    </Typography>
                    <Box id="modal-modal-description" sx={{ my: 2 }}>
                        <Typography sx={{ mt: 2 }}>닉네임</Typography>
                        <TextField
                            hiddenLabel
                            id="outlined-hidden-label-small"
                            defaultValue={DummyUser.nickname}
                            size="small"
                        />
                    </Box>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <Button variant="contained">수정하기</Button>
                        <Button onClick={handleClose}>취소</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default EditProfileModal;
