import { useNavigate } from "react-router-dom";
import naverLogin from "../../assets/naverLogin.png";

const LoginButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button
                // 임시 onClick - 메인화면으로 navigate
                onClick={() => navigate("/main")}
            >
                <img src={naverLogin} alt="로고" className="p-20 pt-10" />
            </button>
        </div>
    );
};

export default LoginButton;
