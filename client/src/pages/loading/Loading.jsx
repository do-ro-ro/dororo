import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optionPost } from "../../apis/server/MainOption";
import car from "../../assets/car.gif";
import check from "../../assets/check.gif";
const Loading = () => {
    const data = useLocation();
    const option = data.state.data; // 이걸 axios 보낼때 보내면 됨

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
                // setIsLoading(false);
            }
        };
        fetchData();
    }, [option]);

    const buttonClick = () => {
        navigate("/recommend", { state: { data: axiosresponse } });
    };

    return (
        <Box
            sx={{ backgroundColor: "#6386BE", width: "100%", height: "100vh" }}
        >
            {isLoading ? (
                <Box>
                    <Box>
                        <img
                            src={car}
                            alt="로딩 중..."
                            style={{
                                width: "18%",
                                height: "auto",
                                borderRadius: "50%",
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                paddingTop: "40vh",
                            }}
                        >
                            최고의 코스를 찾고있어요!
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Box>
                        <img
                            src={check}
                            alt="로딩 중..."
                            style={{
                                width: "18%",
                                height: "auto",
                                borderRadius: "50%",
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                paddingTop: "40vh",
                            }}
                        >
                            코스 생성 완료!
                        </Typography>
                    </Box>
                </Box>
            )}

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
        </Box>
    );
};

export default Loading;
