import { Modal, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

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

// closeModal 함수 구현이 필요합니다.
const RoadViewModal = ({ open, closeModal, lat, lon }) => {
    const { kakao } = window;
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=de7cf0ecdc352456f855abfe68ff01f2";
        document.head.appendChild(script);

        script.onload = () => {
            // Kakao 지도 SDK가 로드된 후 실행될 코드
            kakao.maps.load(() => {
                const roadviewContainer = document.getElementById("roadview");
                const roadview = new kakao.maps.Roadview(roadviewContainer);
                const roadviewClient = new kakao.maps.RoadviewClient();

                const position = new kakao.maps.LatLng(lat, lon);

                roadviewClient.getNearestPanoId(position, 50, (panoId) => {
                    roadview.setPanoId(panoId, position);
                });
            });
        };

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(script);
        };
    }, []);

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={style}>
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ fontWeight: 700 }}
                >
                    로드뷰
                </Typography>

                <Box>
                    <div>
                        {/* 로드뷰를 표시할 div */}
                        <div
                            id="roadview"
                            style={{ width: "100%", height: "300px" }}
                        ></div>
                    </div>
                </Box>
            </Box>
        </Modal>
    );
};

export default RoadViewModal;
