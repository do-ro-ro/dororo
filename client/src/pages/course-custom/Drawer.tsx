import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box, Fab, Stack } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const drawerBleeding = 56;

const StyledBox = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[300],
}));

const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[300],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

export default function Drawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(80% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            {/* <Box sx={{ textAlign: "center", pt: 1 }}>
                <Button onClick={toggleDrawer(true)}>Open</Button>
            </Box> */}
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2 }}>코스 수정하기</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <Box>
                        <Stack alignItems={"center"}>
                            <Box
                                width={"80vw"}
                                bgcolor={"steelblue"}
                                textAlign={"center"}
                                py={"2vh"}
                                my={"2vh"}
                            >
                                출발점
                            </Box>
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box
                                    width={"70vw"}
                                    bgcolor={"steelblue"}
                                    textAlign={"center"}
                                    py={"2vh"}
                                    my={"2vh"}
                                    mx="4vw"
                                >
                                    노드1
                                </Box>
                                <Fab size="small" color="warning">
                                    <Remove />
                                </Fab>
                            </Stack>
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box
                                    width={"70vw"}
                                    bgcolor={"steelblue"}
                                    textAlign={"center"}
                                    py={"2vh"}
                                    my={"2vh"}
                                    mx="4vw"
                                >
                                    노드2
                                </Box>
                                <Fab size="small" color="warning">
                                    <Remove />
                                </Fab>
                            </Stack>
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box
                                    width={"70vw"}
                                    bgcolor={"steelblue"}
                                    textAlign={"center"}
                                    py={"2vh"}
                                    my={"2vh"}
                                    mx="4vw"
                                >
                                    노드3
                                </Box>
                                <Fab size="small" color="warning">
                                    <Remove />
                                </Fab>
                            </Stack>
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box
                                    width={"70vw"}
                                    bgcolor={"steelblue"}
                                    textAlign={"center"}
                                    py={"2vh"}
                                    my={"2vh"}
                                    mx="4vw"
                                >
                                    노드4
                                </Box>
                                <Fab size="small" color="warning">
                                    <Remove />
                                </Fab>
                            </Stack>
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box
                                    width={"70vw"}
                                    bgcolor={"steelblue"}
                                    textAlign={"center"}
                                    py={"2vh"}
                                    my={"2vh"}
                                    mx="4vw"
                                >
                                    노드5
                                </Box>
                                <Fab size="small" color="warning">
                                    <Remove />
                                </Fab>
                            </Stack>
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                            <Box
                                width={"80vw"}
                                bgcolor={"steelblue"}
                                textAlign={"center"}
                                py={"2vh"}
                                my={"2vh"}
                            >
                                도착점
                            </Box>
                        </Stack>
                    </Box>
                    {/* <Skeleton variant="rectangular" height="100%" /> */}
                </StyledBox>
            </SwipeableDrawer>
        </>
    );
}
