import { axiosInstance } from "../../utils/axios/AxiosInstance";

// 유저 프로필 조회
const getUserInfo = async () => {
    try {
        const response = await axiosInstance.get("/users/profile");
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

// 유저 프로필 수정
const editUserInfo = async ({ userId, nickname, profileImage }) => {
    const body = {
        nickname: nickname,
        profileImage: profileImage,
    };
    try {
        const response = axiosInstance.put(`/users/${userId}/profile`, body);
    } catch (error) {
        console.log(error);
    }
};

export { getUserInfo, editUserInfo };
