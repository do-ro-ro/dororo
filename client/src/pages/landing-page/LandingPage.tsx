import LoginButton from "./LoginButton";
import logoWhite from "../../assets/logo_white.png";

function LandingPage() {
    return (
        <div className="bg-dororoBlue w-full h-screen flex flex-col justify-center items-center">
            <img src={logoWhite} alt="로고" className="p-10 pb-3" />
            <p className="text-white text-base font-black">
                빠르게 찾아보는 나만의 운전연습 코스
            </p>
            <LoginButton></LoginButton>
        </div>
    );
}

export default LandingPage;
