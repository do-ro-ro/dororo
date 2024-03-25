import { Outlet, useLocation } from "react-router-dom";
import BasicNavbar from "./BasicNavbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setValue } from "../../features/basicNavbarSlice";

function MainPage() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // URL에 따라 네브바 값 설정
        switch (location.pathname) {
            case "/main/community":
                dispatch(setValue(0));
                break;
            case "/main/recommend":
                dispatch(setValue(1));
                break;
            case `/main/myPage/123`: // 예시 userId
                dispatch(setValue(2));
                break;
            default:
                dispatch(setValue(1)); // 기본값 설정
                break;
        }
    }, [location.pathname, dispatch]);
    return (
        <>
            <Outlet />
            <BasicNavbar />
        </>
    );
}

export default MainPage;
