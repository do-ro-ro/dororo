import { Box, Button, Theme, makeStyles } from "@mui/material";

function FooterBar() {
    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    zIndex: "tooltip",
                }}
                bgcolor={"white"}
            >
                <Button>실행 취소</Button>
                <Button>수정완료</Button>
            </Box>
        </>
    );
}

export default FooterBar;
