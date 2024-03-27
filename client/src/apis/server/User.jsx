import { axiosInstance } from "../../utils/axios/AxiosInstance";

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

export { editUserInfo };
