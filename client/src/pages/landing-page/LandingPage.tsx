import LoginButton from "./LoginButton";

function LandingPage() {
    return (
        // Tailwind CSS 클래스를 사용하여 최상위 div에 배경색, 너비, 최소 높이 설정
        <div className="bg-dororoBlue w-full h-screen flex flex-col justify-center items-center">
            <p>랜딩 페이지</p>
            <LoginButton></LoginButton>
        </div>
    );
}

export default LandingPage;
