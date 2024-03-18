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

function App() {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/recommend"
                        element={<RecommendedCoursePage />}
                    />
                    <Route
                        // path={`/course/:courseId/*`} 이게 나중에 쓸 것. 아래는 임시
                        path="/course"
                        element={<CourseDetailPage />}
                    >
                        <Route path="custom" element={<CourseCustomPage />} />
                        <Route path="drive" element={<CourseDrivePage />} />
                    </Route>
                    <Route
                        path={`/community/*`}
                        element={<CommunityListPage />}
                    >
                        <Route
                            path=":articleId"
                            element={<CommunityDetailPage />}
                        />
                    </Route>
                    <Route path="/myPage/:userId" element={<MyPage />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
