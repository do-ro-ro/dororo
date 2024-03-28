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
import CameraButton from "../../assets/camera_btn.png";

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

function EditProfileModal({ currentUserInfo }) {
    const profileImage =
        currentUserInfo?.profileImage ||
        "https://ssafy-dororo.s3.ap-northeast-2.amazonaws.com/user/blank-profile.png";
    const nickname = currentUserInfo?.nickname || "닉네임";

    const [imgSrc, setImgSrc] = useState(profileImage);
    const [imgFile, setImgFile] = useState(null);
    const [inputNickname, setInputNickname] = useState(nickname);

    // 파일 업로드
    const onUpload = (e) => {
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();

        // 확장자 제한
        if (!["jpeg", "png", "jpg", "JPG", "PNG", "JPEG"].includes(fileExt)) {
            window.alert("jpg, png 형식의 파일만 업로드 가능합니다.");
            return;
        }

        // 파일 리더
        const reader = new FileReader();
        reader.readAsDataURL(file);

        // 파일 업로드
        return new Promise((resolve) => {
            reader.onload = () => {
                // 이미지 경로 갱신
                setImgSrc(reader.result || null); // 파일의 컨텐츠
                // 이미지 파일 선언
                setImgFile(file);
                resolve();
            };
        });
    };

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
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => onUpload(e)}
                            accept="image/*"
                        />
                        <label htmlFor="fileInput">
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
                                    src={imgSrc}
                                    sx={{ width: "4rem", height: "4rem" }}
                                />
                            </Badge>
                        </label>
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
                            defaultValue={nickname}
                            size="small"
                            onChange={(event) => {
                                setInputNickname(event.target.value);
                            }}
                        />
                    </Box>
                    <Typography>{inputNickname}</Typography>
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
