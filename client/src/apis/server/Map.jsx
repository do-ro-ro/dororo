import { axiosInstance } from "../../utils/axios/AxiosInstance";

// 맵 리스트 조회
const getMapsList = async (option) => {
    try {
        let response = null;
        // 옵션값이 없으면 전체 조회
        if (!option) {
            response = axiosInstance.get("/maps");
        } else if (option === "scrapped") {
            response = axiosInstance.get("/maps?map-type=SCRAP");
        }
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

// 서버에 코스 추천 옵션 전달 및 알고리즘 거친 맵들 조회
const postMaps = async () => {
    const body = {};
    try {
        const response = axiosInstance.post("/maps", body);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

// 특정 맵 조회
const getMapDetail = async (mapId) => {
    try {
        const response = axiosInstance.get(`/maps/${mapId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

// 특정 맵 삭제
const deleteMap = async (mapId) => {
    try {
        const response = axiosInstance.delete(`/maps/${mapId}`);
        if (response.status === 200) {
            console.log("맵 삭제 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

// 주행 완료 여부 확인 처리
const checkDrive = async ({ mapId, mapCompletion }) => {
    try {
        const response = axiosInstance.patch(`/maps/${mapId}`);
        if (response.status === 200) {
            console.log("주행 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

export { getMapsList, postMaps, getMapDetail, deleteMap, checkDrive };
