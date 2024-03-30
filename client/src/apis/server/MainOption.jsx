import axios from "axios";
import { axiosInstance } from "../../utils/axios/AxiosInstance";

// main/option에서 선택하고 post

const optionPost = async (option) => {
    try {
        const response = await axiosInstance.post("/maps", option);
        if (response.status === 201) {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};
