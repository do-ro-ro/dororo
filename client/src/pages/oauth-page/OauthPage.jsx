import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const OauthPage = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get("access");
        const refreshToken = urlParams.get("refresh");

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        }

        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                setUser(decoded); // 토큰에서 추출한 사용자 정보를 저장
                console.log(decoded);
                console.log(user);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (user) navigate("/main");
        else navigate("/");
    }, [user, navigate]);

    return <div>Oauth Redirect Page</div>;
};

export default OauthPage;
