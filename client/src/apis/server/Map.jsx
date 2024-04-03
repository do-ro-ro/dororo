import { axiosInstance } from "../../utils/axios/AxiosInstance";

// 맵 리스트 조회
const getMapsList = async (option) => {
    try {
        let response = null;
        // 옵션값이 없으면 전체 조회
        if (!option) {
            response = await axiosInstance.get("/maps");
        } else if (option === "scrapped") {
            response = await axiosInstance.get("/maps?map-type=SCRAP");
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
        const response = await axiosInstance.post("/maps", body);
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
        const response = await axiosInstance.get(`/maps/${mapId}`);
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
        const response = await axiosInstance.delete(`/maps/${mapId}`);
        if (response.status === 200) {
            console.log("맵 삭제 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

// 주행 완료 여부 확인 처리
const checkDrive = async (mapId, body) => {
    try {
        const response = await axiosInstance.post(`/maps/${mapId}`, {
            mapCompletion: true,
        });
        if (response.status === 200) {
            console.log("주행 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

// 코스 저장
const saveCourse = async (
    body,
    // originMapRouteAxis,
    // convertedRouteAxis,
    // path,
    // mapDistance,
    // mapName,
    // mapType,
) => {
    // const body = {
    //     originMapRouteAxis: originMapRouteAxis,
    //     convertedRouteAxis: convertedRouteAxis,
    //     path: path,
    //     mapDistance: mapDistance,
    //     mapName: mapName,
    //     mapType: mapType,
    // };
    try {
        const response = await axiosInstance.post(`/maps/save`, body);
        if (response.status === 200) {
            console.log("코스 저장 성공!");
            return response;
        }
    } catch (e) {
        console.log(e);
    }
};

export {
    getMapsList,
    postMaps,
    getMapDetail,
    deleteMap,
    checkDrive,
    saveCourse,
};
