import { axiosInstance } from "../../utils/axios/AxiosInstance";

// post 샘플
const createChallenge = async ({
    groupId,
    duration,
    initialMoney,
    savedMoney,
    savedPeriod,
}) => {
    const body = {
        groupId: groupId,
        duration: duration,
        initialMoney: initialMoney,
        savedMoney: savedMoney,
        savedPeriod: savedPeriod,
    };
    try {
        const response = await axiosInstance.post("/v1/challenge/create", body);
        if (response.status === 200) return response.data;
        // console.log(response.status);
    } catch (error) {
        console.log(body);
    }
};

// get 샘플
const getChallengeRanking = async (challengeId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/challenge/${challengeId}/ranking`,
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {}
};

// 커뮤니티 map 게시글 전체 or 필터링 조회
const getMapPostsList = async () => {
    try {
        const response = await axiosInstance.get(`/map-posts`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {}
};

// 커뮤니티 map 게시글 상세 조회
const getMapPosts = async (postId) => {
    try {
        const response = await axiosInstance.get(`/map-posts/${postId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {}
};

// 커뮤니티 게시글 생성
const createMapPosts = async ({ postTitle, postContent, reviewRef }) => {
    const body = {
        mapId: 0,
        postTitle: postTitle,
        postContent: postContent,
        reviewRef: reviewRef,
    };
    try {
        const response = await axiosInstance.post("/map-posts", body);
        if (response.status === 200) return response.data;
        // console.log(response.status);
    } catch (error) {
        console.log(body);
    }
};
