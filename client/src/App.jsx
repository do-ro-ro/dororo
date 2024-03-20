import "./App.css";
import { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import RecommendedCoursePage from "./pages/recommend-course/RecommendCoursePage";
import CourseDetailPage from "./pages/course-detail/CourseDetailPage";
import CourseCustomPage from "./pages/course-custom/CourseCustomPage";
import CourseDrivePage from "./pages/course-drive/CourseDrivePage";
import CommunityListPage from "./pages/community-list/CommunityListPage";
import CommunityDetailPage from "./pages/community-detail/CommunityDetailPage";
import MyPage from "./pages/my-page/MyPage";
import { ThemeProvider, createTheme } from "@mui/material";

const colorTheme = createTheme({
    palette: {
        primary: {
            main: "#6386BE",
        },
        // 아래에 색 추가하시면 됩니다. MUI Tokens/Palette 참조
    },
});

function App() {
    return (
        <>
            <ThemeProvider theme={colorTheme}>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/recommend"
                            element={<RecommendedCoursePage />}
                        />
                        <Route
                            // path={`/course/:courseId/*`} 이게 나중에 쓸 것. 아래는 임시
                            path="/course/:courseId"
                            element={<CourseDetailPage />}
                        />
                        <Route
                            path="/course/:courseId/custom"
                            element={<CourseCustomPage />}
                        />
                        <Route
                            path="/course/:courseId/drive"
                            element={<CourseDrivePage />}
                        />
                        <Route
                            path="/community"
                            element={<CommunityListPage />}
                        />
                        <Route
                            path="/community/:articleId"
                            element={<CommunityDetailPage />}
                        />
                        <Route path="/myPage/:userId" element={<MyPage />} />
                    </Routes>
                </Suspense>
            </ThemeProvider>
        </>
    );
}

export default App;
