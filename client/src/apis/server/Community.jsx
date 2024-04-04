import { axiosInstance } from "../../utils/axios/AxiosInstance";

// 커뮤니티 map 게시글 전체 or 필터링 조회
const getMapPostsList = async () => {
    try {
        const response = await axiosInstance.get(`/map-posts`);
        if (response.status === 200) {
            return response;
        } else if (response.status === 409) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

// 커뮤니티 map 게시글 상세 조회
const getMapPosts = async (postId) => {
    try {
        const response = await axiosInstance.get(`/map-posts/${postId}`);
        console.log(response);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

// 커뮤니티 게시글 생성
const createMapPosts = async (mapId, postTitle, postContent) => {
    const body = {
        mapId: mapId,
        postTitle: postTitle,
        postContent: postContent,
        reviewRef: "테스트",
    };
    console.log(body);
    try {
        const response = await axiosInstance.post("/map-posts", body);
        if (response.status === 201) return response.data;
        // console.log(response.status);
    } catch (error) {
        console.log(error);
    }
};

// 커뮤니티 게시글 삭제
const deleteMapPosts = async (postId) => {
    try {
        const response = await axiosInstance.delete(`/map-posts/${postId}`);
        if (response.status === 200) {
            console.log("게시글 삭제 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

// mapPost 스크랩하기
const scrapMapPosts = async (postId) => {
    try {
        const response = await axiosInstance.post(`/map-posts/${postId}/scrap`);
        if (response.status === 201) {
            console.log("스크랩 성공!");
            return response.status;
        }
    } catch (error) {
        console.log(error);
    }
};

const cancelScrapMapPosts = async (postId) => {
    try {
        const response = await axiosInstance.delete(
            `/map-posts/${postId}/scrap`,
        );
        if (response.status === 200) {
            console.log("스크랩 취소!");
            return response.status;
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    getMapPostsList,
    getMapPosts,
    createMapPosts,
    deleteMapPosts,
    scrapMapPosts,
    cancelScrapMapPosts,
};
