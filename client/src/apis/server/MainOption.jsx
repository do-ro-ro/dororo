import { axiosInstance } from "../../utils/axios/AxiosInstance";

// main/option에서 선택하고 post

const optionPost = async (option) => {
    try {
        const response = await axiosInstance.post("/maps", option);
        if (response.status === 201) {
            console.log("Success:", response.data);
            return response.data;
        } else if (response.status === 200) {
            console.log("200", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error posting option:", error);
    }
};

export { optionPost };
