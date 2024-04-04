import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { deleteMap } from "../../apis/server/Map";
import { useNavigate } from "react-router-dom";
import { deleteMapPosts } from "../../apis/server/Community";

function DeleteDialog(props) {
    const { variant, mapId, postId, ...rest } = props;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (variant === "course") {
            await deleteMap(mapId);
            navigate("/main/myPage");
        } else {
            await deleteMapPosts(postId);
            navigate("/main/community");
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="error"
                sx={{ height: "3vh" }}
                onClick={handleClickOpen}
            >
                삭제
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    정말로 {variant === "post" ? "게시물을 " : "코스를 "}
                    삭제하시겠습니까?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        삭제한 후에는 취소할 수 없습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button
                        onClick={() => handleDelete()}
                        variant="contained"
                        color="error"
                        autoFocus
                    >
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteDialog;
// 가이드 : https://mui.com/material-ui/react-dialog/
