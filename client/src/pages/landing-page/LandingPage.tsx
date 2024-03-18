import LoginButton from "./LoginButton";
import logoWhite from "../../assets/logo_white.png";

function LandingPage() {
    return (
        <div className="bg-dororoBlue w-full h-screen flex flex-col justify-center items-center">
            <img src={logoWhite} alt="로고" className="p-10" />
            <p></p>
            <LoginButton></LoginButton>
        </div>
    );
}

export default LandingPage;
