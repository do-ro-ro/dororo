import { Snackbar, Alert } from "@mui/material";

function DororoSnackbar(props) {
    const { open, onClose, ...rest } = props;

    return (
        <>
            <Snackbar open={open}>
                <Alert onClose={onClose}>마이페이지로 스크랩되었습니다</Alert>
            </Snackbar>
        </>
    );
}

export default DororoSnackbar;
