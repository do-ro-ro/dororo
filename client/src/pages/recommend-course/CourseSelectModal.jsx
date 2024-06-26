import { Modal, Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { savePost } from "../../apis/server/MapSave";
import { useNavigate } from "react-router-dom";

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

const CourseSelectModal = ({ open, closeModal, path, location, distance }) => {
    const navigate = useNavigate();

    const [mapData, setMapData] = useState({
        originMapRouteAxis: location.originMapRouteAxis,
        convertedRouteAxis: location.convertedRouteAxis,
        path: path,
        mapDistance: distance,
        mapName: "",
        mapType: "DEFAULT",
    });

    useEffect(() => {
        console.log(mapData);
    }, [mapData]);

    const handleSaveCourse = async () => {
        const response = await savePost(mapData);
        closeModal();
        console.log("/saveMap", response);
        navigate("/main/myPage");
    };

    const handleCourseNameChange = (event) => {
        setMapData((prevMapData) => ({
            ...prevMapData,
            mapName: event.target.value,
        }));
    };

    return (
        <>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{ fontWeight: 700 }}
                    >
                        저장하기
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.75rem", // 더 작은 글씨
                            color: "grey.600", // 회색
                            mb: 3,
                        }}
                    >
                        코스 이름을 정해주세요! 마이페이지에 저장됩니다.
                    </Typography>

                    <Box>
                        <TextField
                            id="standard-basic"
                            label="코스명을 입력해주세요"
                            variant="standard"
                            onChange={handleCourseNameChange}
                            sx={{
                                width: "100%",
                                mb: 3,
                            }}
                            InputProps={{
                                style: {
                                    fontSize: "1.25rem", // 입력 필드의 폰트 크기 늘리기
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: "0.85rem", // 라벨 폰트 크기 줄이기
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: "1rem",
                                mr: 1,
                            }}
                            onClick={handleSaveCourse}
                        >
                            저장
                        </Button>

                        <Button
                            variant="contained"
                            onClick={closeModal}
                            sx={{
                                fontSize: "1rem",
                                ml: 1,
                                backgroundColor: "#9e9e9e",
                            }}
                        >
                            닫기
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default CourseSelectModal;
// 저장을 누르면 사진과 코스명을 같이 보내야함
// 사진 캡쳐하는 라이브러리
// 그리고 저장하면 마이페이지로 보내는 네이게이터 설정
