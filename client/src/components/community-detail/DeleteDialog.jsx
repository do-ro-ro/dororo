import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";

function DeleteDialog(props) {
    const [variant, ...rest] = props;
    const [open, setOpen] = useState(false);

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
                    정말로 삭제하시겠습니까?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        삭제한 후에는 취소할 수 없습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button
                        onClick={handleClose}
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
