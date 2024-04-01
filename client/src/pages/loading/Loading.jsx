import { Box, Button, Typography } from "@mui/material";
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
                backgroundColor: "#6386BE",
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isLoading ? (
                <>
                    <img
                        src={car}
                        alt="로딩 중..."
                        style={{
                            width: "18%",
                            height: "auto",
                            borderRadius: "50%",
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{ color: "#FFFFFF", textAlign: "center" }}
                    >
                        최고의 코스를 찾고있어요!
                    </Typography>
                </>
            ) : (
                <>
                    <img
                        src={check}
                        alt="로딩 완료"
                        style={{
                            width: "18%",
                            height: "auto",
                            borderRadius: "50%",
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{ color: "#FFFFFF", textAlign: "center" }}
                    >
                        코스 생성 완료!
                    </Typography>
                    {!isLoading && (
                        <Button
                            onClick={buttonClick}
                            variant="contained"
                            sx={{
                                mt: 4,
                                backgroundColor: "red",
                                ":hover": { backgroundColor: "darkred" },
                            }}
                        >
                            확인
                        </Button>
                    )}
                </>
            )}
            {/* isLoading 상태와 관계없이 Quiz 컴포넌트를 렌더링 */}
            <Quiz />
        </Box>
    );
};

export default Loading;
