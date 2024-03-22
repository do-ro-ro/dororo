import React from "react";

import {
    Modal,
    Box,
    Typography,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
} from "@mui/material";
import RedoIcon from "@mui/icons-material/Redo";
import RefreshIcon from "@mui/icons-material/Refresh";
import Slider from "@mui/material/Slider";

// 모달 스타일 정의
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "3px solid #6386BE",
    boxShadow: 24,
    p: 4,
};

const OptionModal = ({ open, closeModal, setOption, option }) => {
    const handleMethodChange = (e) => {
        setOption({ ...option, method: e.target.value });
        console.log(option);
    };

    const handleSliderChange = (e) => {
        setOption({ ...option, length: Math.max(e.target.value, 5) });
    };

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={style}>
                <Box>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{ fontWeight: 700 }}
                    >
                        코스 옵션 설정하기
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ mt: 2, fontWeight: 600 }}
                    >
                        편도/왕복 설정
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.75rem", // 더 작은 글씨
                            color: "grey.600", // 회색
                            mb: 2,
                        }}
                    >
                        코스에 대한 편도, 왕복을 선택해주세요!
                    </Typography>
                    <RadioGroup onChange={handleMethodChange} row>
                        <Box>
                            <FormControlLabel
                                value="oneway"
                                label={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <RedoIcon
                                            sx={{ mr: 1, color: "#6386BE" }}
                                        />
                                        {"편도"}
                                    </Box>
                                }
                                control={<Radio />}
                                labelPlacement="start"
                            />
                        </Box>
                        <Box>
                            <FormControlLabel
                                value="roundway"
                                label={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <RefreshIcon
                                            sx={{ mr: 1, color: "#6386BE" }}
                                        />
                                        {"왕복"}
                                    </Box>
                                }
                                control={<Radio />}
                                labelPlacement="start"
                            />
                        </Box>
                    </RadioGroup>
                </Box>

                <Box>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ mt: 2, fontWeight: 600 }}
                    >
                        코스길이
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.75rem", // 더 작은 글씨
                            color: "grey.600", // 회색
                            mb: 2,
                        }}
                    >
                        최소 길이는 5km 입니다. 코스 길이를 설정해주세요.
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ width: "90%" }}>
                            <Slider
                                value={
                                    typeof option.length === "number"
                                        ? option.length
                                        : 0
                                }
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                            />
                        </Box>
                    </Box>
                </Box>
                <Button variant="contained" sx={{ mt: 2 }} onClick={closeModal}>
                    닫기
                </Button>
            </Box>
        </Modal>
    );
};

export default OptionModal;
