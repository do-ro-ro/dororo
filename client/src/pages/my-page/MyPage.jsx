import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import CourseCard from "../../components/course-card/CourseCard";
import BasicProfile from "../../assets/user_profile_basic.png";
import { BorderColor, Edit } from "@mui/icons-material";
import EditProfileModal from "../../components/my-page/EditProfileModal";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/server/User";
import { getMapsList } from "../../apis/server/Map";
import { getMapPostsList } from "../../apis/server/Community";

const DummyCourseList = [
    {
        post_id: 0,
        post_title: "코스 샘플 1",
        post_content: "내용",
        updated_at: "2024-03-21",
        scrap_count: 10,
        user_id: 1,
    },
    {
        post_id: 1,
        post_title: "코스 샘플 2",
        post_content: "내용",
        updated_at: "2024-03-20",
        scrap_count: 14,
        user_id: 10,
    },
    {
        post_id: 2,
        post_title: "코스 샘플 3",
        post_content: "내용",
        updated_at: "2024-03-19",
        scrap_count: 100,
        user_id: 1,
    },
    {
        post_id: 3,
        post_title: "코스 샘플 4",
        post_content: "내용",
        updated_at: "2024-03-18",
        scrap_count: 30,
        user_id: 11,
    },
    {
        post_id: 4,
        post_title: "코스 샘플 5",
        post_content: "내용",
        updated_at: "2024-03-17",
        scrap_count: 50,
        user_id: 1,
    },
    {
        post_id: 5,
        post_title: "코스 샘플 6",
        post_content: "내용",
        updated_at: "2024-03-16",
        scrap_count: 20,
        user_id: 14,
    },
];

const DummyUser = {
    user_id: 1,
    name: "김싸피",
    nickname: "녹산동레이서",
    profile_image: BasicProfile,
};

function MyPage() {
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [currentUserCourses, setCurrentUserCourses] = useState(null);
    const [currentMapPostsList, setCurrentMapPostsList] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserInfo();
                const updatedUserInfo = response;
                setCurrentUserInfo(updatedUserInfo);
                // console.log(updatedUserInfo);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUserCourse = async () => {
            try {
                const response = await getMapsList();
                const updatedUserCourses = response;
                // console.log(updatedUserCourses);
                setCurrentUserCourses(updatedUserCourses);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPostsData = async () => {
            try {
                const response = await getMapPostsList();
                const updatedMapPostsList = response;
                // console.log(response);
                setCurrentMapPostsList(updatedMapPostsList);
                console.log(updatedMapPostsList);
                // console.log(currentMapPostsList);
            } catch (error) {
                console.error("게시글 리스트 불러오기 실패", error);
            }
        };
        fetchUserData();
        fetchUserCourse();
        fetchPostsData();
    }, []);
    return (
        <>
            <Box pb="10vh">
                <Topbar>마이페이지</Topbar>

                <Stack mx={4} mt={2} height={"90vh"}>
                    <Paper>
                        <Stack
                            direction={"row"}
                            sx={{ p: 2 }}
                            justifyContent={"space-between"}
                        >
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box sx={{ mr: 2 }}>
                                    <img width={"30vw"} src={BasicProfile} />
                                </Box>

                                <Typography>
                                    {currentUserInfo
                                        ? `안녕하세요, ${currentUserInfo.nickname}님!`
                                        : "유저 정보를 불러오고 있습니다"}
                                </Typography>
                            </Stack>
                            <EditProfileModal
                                currentUserInfo={currentUserInfo}
                            />
                        </Stack>
                    </Paper>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant="h6" sx={{ my: 2 }}>
                            내가 추천받은 코스
                        </Typography>
                        <Button>모두 보기</Button>
                    </Stack>
                    <Stack direction={"row"}>
                        {currentUserCourses?.slice(0, 3).map((course) => {
                            if (course.mapType !== "SCRAP") {
                                return (
                                    <CourseCard
                                        key={course.mapId}
                                        postId={course.mapId}
                                        mapImage={course.mapImage}
                                    >
                                        {course.mapName}
                                    </CourseCard>
                                );
                            }
                        })}
                    </Stack>
                    <Stack
                        sx={{ my: 2 }}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant="h6">내가 스크랩한 코스</Typography>
                    </Stack>
                    <Stack direction={"row"}>
                        {currentUserCourses?.map((course) => {
                            if (course.mapType === "SCRAP") {
                                return (
                                    <CourseCard
                                        key={course.mapId}
                                        postId={course.mapId}
                                        variant={"course"}
                                        mapImage={course.mapImage}
                                    >
                                        {course.mapName}
                                    </CourseCard>
                                );
                            }
                        })}
                    </Stack>
                    <Stack
                        sx={{ my: 2 }}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant="h6">내가 공유한 코스</Typography>
                    </Stack>
                    <Stack direction={"row"}>
                        {currentMapPostsList?.map((course) => {
                            if (course.isMine) {
                                return (
                                    <CourseCard
                                        key={course.postId}
                                        postId={course.postId}
                                        variant={"my_post"}
                                        mapImage={course.mapImage}
                                    >
                                        {course.postTitle}
                                    </CourseCard>
                                );
                            }
                        })}
                    </Stack>
                    {/* <Stack direction="column">{renderCourseCardRows()}</Stack> */}
                </Stack>
            </Box>
        </>
    );
}

export default MyPage;
