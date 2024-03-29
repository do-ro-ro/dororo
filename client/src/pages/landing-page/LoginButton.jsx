import naverLogin from "../../assets/naverLogin.png";

const LoginButton = () => {
    const handleNaverLogin = () => {
        window.location.href =
            "https://j10e202.p.ssafy.io/api/auth/oauth2/naver";
    };
    return (
        <div>
            <button onClick={handleNaverLogin}>
                <img src={naverLogin} alt="로고" className="p-20 pt-10" />
            </button>
        </div>
    );
};

export default LoginButton;
