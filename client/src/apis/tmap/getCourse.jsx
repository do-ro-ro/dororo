import axios from "axios";

const getCourse = axios({
    method: "get",
    url: "https://3a27a89c-5eb2-4e4d-b5b3-f58c6f76e577.mock.pstmn.io/list",
    responseType: "json",
});

export { getCourse };
