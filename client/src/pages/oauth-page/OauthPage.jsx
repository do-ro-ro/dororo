import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

        if (localStorage.getItem("accessToken")) {
            navigate("/main");
        } else {
            navigate("/");
        }
    }, []);

    return <div>Oauth Redirect</div>;
};

export default OauthPage;
