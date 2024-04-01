import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { optionPost } from "../../apis/server/MainOption";

// 모달 스타일 정의
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "4px solid #6386BE",
    boxShadow: 24,
    p: 4,
};

const OptionModal = ({ open, closeModal, lat, lng }) => {
    const [option, setOption] = useState({
        mapDistance: 5,
        turnLeft: 1,
        turnRight: 1,
        uturn: 1,
        startPoint: {
            lat: lat,
            lng: lng,
        },
        return: true,
    });

    const navigate = useNavigate();

    // const handleMethodChange = (e) => {
    //     setOption({ ...option, method: e.target.value });
    //     console.log(option);
    // };
    const handleConfirmClick = async () => {
        const response = await optionPost(option); // 옵션 객체를 서버에 전송
        closeModal(); // 모달 닫기
        // console.log("optionModal", response);
        navigate("/recommend", { state: { data: response } });
    };

    const handleSliderChange = (e) => {
        setOption({ ...option, mapDistance: Math.max(e.target.value, 5) });
    };

    const handleDecrease = (direction) => {
        setOption((prevOption) => ({
            ...prevOption,
            [direction]:
                prevOption[direction] > 1 ? prevOption[direction] - 1 : 1,
        }));
    };

    const handleIncrease = (direction) => {
        setOption((prevOptions) => ({
            ...prevOptions,
            [direction]: prevOptions[direction] + 1, // 값을 증가
        }));
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
                {/* <Box>
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
                    <RadioGroup
                        onChange={handleMethodChange}
                        row
                        sx={{ justifyContent: "center" }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                            <FormControlLabel
                                value="roundway"
                                sx={{ mr: 3 }}
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
                </Box> */}
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
                                    typeof option.mapDistance === "number"
                                        ? option.mapDistance
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
                <Box>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ mt: 2, fontWeight: 600 }}
                    >
                        코스 옵션
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.75rem", // 더 작은 글씨
                            color: "grey.600", // 회색
                            mb: 2,
                        }}
                    >
                        최소 횟수는 1입니다. 희망하는 횟수를 선택해주세요!
                    </Typography>

                    <Box
                        sx={{
                            display: "flex", // flexbox 레이아웃을 사용하도록 설정
                            justifyContent: "space-between", // 자식 요소 사이에 균등한 간격을 설정
                            alignItems: "center", // 수직 방향으로 중앙 정렬
                            p: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: "4rem", // 전체 박스 폭 설정
                                display: "flex", // 전체 박스를 flex로 설정
                                flexDirection: "column", // 내부 요소들을 세로로 정렬
                                alignItems: "center", // 가로축 기준 중앙 정렬
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    border: "1px solid #6386BE",
                                    width: "100%",
                                    height: "4rem", // 너비와 동일하게 높이 설정
                                    display: "flex", // flexbox를 사용하여 자식 요소들을 정렬
                                    flexDirection: "column", // 자식 요소들을 세로로 정렬
                                    alignItems: "center", // 가로 축 중앙 정렬
                                    justifyContent: "center", // 세로 축 중앙 정렬
                                    p: 0, // 내부 여백 없앰
                                }}
                            >
                                <TurnLeftIcon
                                    sx={{
                                        color: "#6386BE",
                                        fontSize: "3rem",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: "0.7rem",
                                        color: "#6386BE",
                                        fontWeight: "bold",
                                        mb: 0.5,
                                    }}
                                >
                                    좌회전
                                </Typography>
                            </Paper>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    mt: "0.5rem",
                                }}
                            >
                                <Button
                                    sx={{ p: 0, minWidth: "auto" }}
                                    onClick={() => handleDecrease("turnLeft")}
                                >
                                    <IndeterminateCheckBoxIcon />
                                </Button>
                                <Typography
                                    sx={{ mx: 0.7, fontWeight: "bold" }}
                                >
                                    {option.turnLeft} {/* 숫자 표시 */}
                                </Typography>
                                <Button
                                    sx={{ p: 0, minWidth: "auto" }}
                                    onClick={() => handleIncrease("turnLeft")}
                                >
                                    <AddBoxIcon />
                                </Button>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width: "4rem", // 전체 박스 폭 설정
                                display: "flex", // 전체 박스를 flex로 설정
                                flexDirection: "column", // 내부 요소들을 세로로 정렬
                                alignItems: "center", // 가로축 기준 중앙 정렬
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    border: "1px solid #6386BE",
                                    width: "100%",
                                    height: "4rem", // 너비와 동일하게 높이 설정
                                    display: "flex", // flexbox를 사용하여 자식 요소들을 정렬
                                    flexDirection: "column", // 자식 요소들을 세로로 정렬
                                    alignItems: "center", // 가로 축 중앙 정렬
                                    justifyContent: "center", // 세로 축 중앙 정렬
                                    p: 0, // 내부 여백 없앰
                                }}
                            >
                                <TurnRightIcon
                                    sx={{
                                        color: "#6386BE",
                                        fontSize: "3rem",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: "0.7rem",
                                        color: "#6386BE",
                                        fontWeight: "bold",
                                        mb: 0.5,
                                    }}
                                >
                                    우회전
                                </Typography>
                            </Paper>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    mt: "0.5rem",
                                }}
                            >
                                <Button
                                    sx={{ p: 0, minWidth: "auto" }}
                                    onClick={() => handleDecrease("turnRight")}
                                >
                                    <IndeterminateCheckBoxIcon />
                                </Button>
                                <Typography
                                    sx={{ mx: 0.7, fontWeight: "bold" }}
                                >
                                    {option.turnRight} {/* 숫자 표시 */}
                                </Typography>
                                <Button
                                    sx={{ p: 0, minWidth: "auto" }}
                                    onClick={() => handleIncrease("turnRight")}
                                >
                                    <AddBoxIcon />
                                </Button>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width: "4rem", // 전체 박스 폭 설정
                                display: "flex", // 전체 박스를 flex로 설정
                                flexDirection: "column", // 내부 요소들을 세로로 정렬
                                alignItems: "center", // 가로축 기준 중앙 정렬
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    border: "1px solid #6386BE",
                                    width: "100%",
                                    height: "4rem", // 너비와 동일하게 높이 설정
                                    display: "flex", // flexbox를 사용하여 자식 요소들을 정렬
                                    flexDirection: "column", // 자식 요소들을 세로로 정렬
                                    alignItems: "center", // 가로 축 중앙 정렬
                                    justifyContent: "center", // 세로 축 중앙 정렬
                                    p: 0, // 내부 여백 없앰
                                }}
                            >
                                <UTurnLeftIcon
                                    sx={{
                                        color: "#6386BE",
                                        fontSize: "3rem",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: "0.7rem",
                                        color: "#6386BE",
                                        fontWeight: "bold",
                                        mb: 0.5,
                                    }}
                                >
                                    유턴
                                </Typography>
                            </Paper>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    mt: "0.5rem",
                                }}
                            >
                                <Button
                                    sx={{ p: 0, minWidth: "auto" }}
                                    onClick={() => handleDecrease("uturn")}
                                >
                                    <IndeterminateCheckBoxIcon />
                                </Button>
                                <Typography
                                    sx={{ mx: 0.7, fontWeight: "bold" }}
                                >
                                    {option.uturn} {/* 숫자 표시 */}
                                </Typography>
                                <Button
                                    sx={{ p: 0, minWidth: "auto" }}
                                    onClick={() => handleIncrease("uturn")}
                                >
                                    <AddBoxIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* 확인 버튼을 누르면 axios post로 option을 보내고 코스옵션
                기본으로 되돌리는 함수 정의하기 */}

                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleConfirmClick}>
                        확인
                    </Button>

                    <Button
                        variant="contained"
                        onClick={closeModal}
                        sx={{ ml: 3 }}
                    >
                        닫기
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default OptionModal;
