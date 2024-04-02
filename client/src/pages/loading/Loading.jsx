import { Box, Button, Typography, Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optionPost } from "../../apis/server/MainOption";
import car from "../../assets/car.gif";
import check from "../../assets/check.gif";
import Quiz from "./Quiz"; // Quiz 컴포넌트를 올바르게 import합니다.

const Loading = () => {
    const data = useLocation();
    const option = data.state.data;

    const [axiosresponse, setAxiosResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await optionPost(option);
                setAxiosResponse(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // 로딩 상태 업데이트
            }
        };
        fetchData();
    }, [option]);

    const buttonClick = () => {
        navigate("/recommend", { state: { data: axiosresponse } });
    };

    return (
        <Box
            sx={{
                position: "relative",
                backgroundColor: "#6386BE",
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "centers",
                }}
            >
                {isLoading ? (
                    <>
                        <Avatar
                            src={car}
                            alt="로딩 중..."
                            sx={{
                                width: "22%", // 원하는 너비 설정
                                height: "auto", // 높이를 자동으로 조절
                                mb: 2,
                            }}
                        />

                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#FFFFFF",
                                    textAlign: "center",
                                    fontWeight: 600,
                                }}
                            >
                                코스를 찾고있어요!
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Avatar
                            src={check}
                            alt="로딩 완료"
                            sx={{
                                width: "22%", // 원하는 너비 설정
                                height: "auto", // 높이를 자동으로 조절
                                mb: 2,
                            }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontWeight: 600,
                            }}
                        >
                            코스 생성 완료!
                        </Typography>
                    </>
                )}
                {/* isLoading 상태와 관계없이 Quiz 컴포넌트를 렌더링 */}
                <Quiz />
            </Box>
            {!isLoading && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,

                        pb: 3,
                    }}
                >
                    <Button
                        onClick={buttonClick}
                        variant="contained"
                        sx={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            backgroundColor: "red",
                            ":hover": {
                                backgroundColor: "red", // 호버 시에도 배경색을 red로 유지
                                "@media (hover: none)": {
                                    backgroundColor: "red", // 터치 기반 장치에서 호버 스타일 비활성화
                                },
                            },
                        }}
                    >
                        확인
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Loading;
