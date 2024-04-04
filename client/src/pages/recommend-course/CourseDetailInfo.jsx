import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const CourseDetailInfo = ({ courseNode }) => {
    const [results, setResults] = useState([]);
    useEffect(() => {
        const getKakaoMapAddress = async (latitude, longitude) => {
            const apiKey = import.meta.env.VITE_KAKAOMAP_REST_API_KEY; // 자신의 Kakao API 키로 대체하세요
            const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `KakaoAK ${apiKey}`,
                    },
                });

                const address = response.data.documents[0]?.address;
                if (address) {
                    return `${address.address_name}  `;
                } else {
                    return "주소를 찾을 수 없습니다.";
                }
            } catch (error) {
                console.error("Error:", error);
                return "주소를 가져오는 중에 오류가 발생했습니다.";
            }
        };

        const fetchAddresses = async () => {
            const addressPromises = courseNode.map((node) =>
                getKakaoMapAddress(node.lat, node.lng),
            );
            const addressResults = await Promise.all(addressPromises);
            setResults(addressResults); // 배열에 결과 저장
        };

        fetchAddresses();
    }, [courseNode]); // courseNode가 변경될 때마다 useEffect 실행

    return (
        <Box>
            {results.map((result, index) => (
                <Box
                    key={index}
                    sx={{
                        width: "100%",
                        height: "6vh",
                        backgroundColor: "#6386BE",
                        color: "white",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ width: "20%", textAlign: "center" }}>
                        <Typography sx={{ fontSize: "1.5rem" }}>
                            {index + 1}
                        </Typography>
                    </Box>

                    <Box>
                        <Box>
                            <Typography>
                                {" "}
                                {index === 0
                                    ? "출발 지점"
                                    : index === results.length - 1
                                    ? "도착 지점"
                                    : ` ${index}번 경유지 `}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={{ fontSize: "0.8rem" }}>
                                {result}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default CourseDetailInfo;
