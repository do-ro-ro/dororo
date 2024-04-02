import { axiosInstance } from "../../utils/axios/AxiosInstance";

const savePost = async (mapData) => {
    try {
        const response = await axiosInstance.post("/maps/save", mapData);
        if (response.status === 201) {
            return response.data;
        } else if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error posting option:", error);
    }
};

export { savePost };
