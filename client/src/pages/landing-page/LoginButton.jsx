import naverLogin from "../../assets/naverLogin.png";

const LoginButton = () => {
    return (
        <div>
            <button>
                <img src={naverLogin} alt="로고" className="p-20 pt-10" />
            </button>
        </div>
    );
};

export default LoginButton;
