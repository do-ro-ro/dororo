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
                                    안녕하세요, {DummyUser.nickname}님!
                                </Typography>
                            </Stack>
                            <EditProfileModal />
                        </Stack>
                    </Paper>
                    <Typography sx={{ my: 2 }}>내가 추천받은 코스</Typography>
                    <Stack direction={"row"}>
                        {DummyCourseList.map((course) => {
                            if (course.user_id === DummyUser.user_id) {
                                return (
                                    <CourseCard
                                        key={course.post_id}
                                        postId={course.post_id}
                                    >
                                        {course.post_title}
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
                        <Typography>내가 스크랩한 코스</Typography>
                    </Stack>
                    <Stack direction={"row"}>
                        {DummyCourseList.map((course) => {
                            if (course.user_id !== DummyUser.user_id) {
                                return (
                                    <CourseCard
                                        key={course.post_id}
                                        postId={course.post_id}
                                        variant={"course"}
                                    >
                                        {course.post_title}
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
                        <Typography>내가 추천한 코스</Typography>
                    </Stack>
                    <Stack direction={"row"}>
                        {DummyCourseList.map((course) => {
                            if (course.user_id !== DummyUser.user_id) {
                                return (
                                    <CourseCard
                                        key={course.post_id}
                                        postId={course.post_id}
                                        variant={"my_post"}
                                    >
                                        {course.post_title}
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
