import { Outlet } from "react-router-dom";
import BasicNavbar from "./BasicNavbar";

function MainPage() {
    return (
        <>
            <Outlet />
            <BasicNavbar />
        </>
    );
}

export default MainPage;
