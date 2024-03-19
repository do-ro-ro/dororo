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
import { useState } from "react";
import { useEffect } from "react";

const drawerBleeding = 56;

const StyledBox = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[300],
}));

const Puller = styled("div")(({ theme }) => ({
    width: 100,
    height: 8,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[300],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 45px)",
}));

function Drawer(props) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        const drawer = document.querySelector(".MuiDrawer-root");
        if (drawer) {
            drawer.style.bottom = "100px"; // 원하는 위치로 변경
        }
    }, []);

    return (
        <>
            <Box>
                <CssBaseline />
                <Global
                    styles={{
                        ".MuiDrawer-root > .MuiPaper-root": {
                            height: `calc(90% - ${drawerBleeding}px)`,
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
                    hideBackdrop={true}
                    // hysteresis={800}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        position: "absolute",
                        bottom: "100px",
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
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                >
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
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                >
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
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                >
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
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                >
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
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                >
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
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                >
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
            </Box>
        </>
    );
}

export default Drawer;
