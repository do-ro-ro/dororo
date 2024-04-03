import {
    Avatar,
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

function MyPage() {
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [currentUserCourses, setCurrentUserCourses] = useState(null);
    const [currentMapPostsList, setCurrentMapPostsList] = useState([]);
    const [getAllPosts, setGetAllPosts] = useState(false);
    const [getAllScrappedPosts, setGetAllScrappedPosts] = useState(false);
    const [getAllSharedPosts, setGetAllSharedPosts] = useState(false);

    const profileImage =
        currentUserInfo?.profileImage ||
        "https://ssafy-dororo.s3.ap-northeast-2.amazonaws.com/user/blank-profile.png";

    const [imgSrc, setImgSrc] = useState(profileImage);

    const recommendedPostLists = currentUserCourses
        ?.reverse()
        .filter((course) => course.mapType !== "SCRAP");
    const scrappedPostLists = currentUserCourses
        ?.reverse()
        .filter((course) => course.mapType === "SCRAP");

    const mySharedPostLists = currentMapPostsList
        ?.reverse()
        .filter((post) => post.isMine === true);

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
                const updatedMapPostsList = response.data;
                console.log(response);
                setCurrentMapPostsList(updatedMapPostsList);
                // console.log(updatedMapPostsList);
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
            <Topbar>마이페이지</Topbar>
            <Box pb="30vh" mb={30} mt={8}>
                <Stack mx={4} mt={2} height={"90vh"}>
                    <Paper>
                        <Stack
                            direction={"row"}
                            sx={{ p: 2 }}
                            justifyContent={"space-between"}
                        >
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box sx={{ mr: 2 }}>
                                    <Avatar
                                        alt="profile"
                                        src={imgSrc}
                                        sx={{
                                            width: "2.5rem",
                                            height: "2.5rem",
                                        }}
                                    />
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
                        <Button
                            onClick={() => {
                                if (getAllPosts) {
                                    setGetAllPosts(false);
                                } else {
                                    setGetAllPosts(true);
                                }
                            }}
                        >
                            모두 보기
                        </Button>
                    </Stack>
                    {getAllPosts ? (
                        <Stack>
                            {recommendedPostLists?.map((course) => {
                                return (
                                    <CourseCard
                                        key={course.mapId}
                                        postId={course.mapId}
                                        course={course}
                                    >
                                        {course.mapName}
                                    </CourseCard>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Stack>
                            {recommendedPostLists?.slice(0, 3).map((course) => {
                                return (
                                    <CourseCard
                                        key={course.mapId}
                                        postId={course.mapId}
                                        course={course}
                                    >
                                        {course.mapName}
                                    </CourseCard>
                                );
                            })}
                        </Stack>
                    )}

                    <Stack
                        sx={{ my: 2 }}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant="h6">내가 스크랩한 코스</Typography>
                        <Button
                            onClick={() => {
                                if (getAllScrappedPosts) {
                                    setGetAllScrappedPosts(false);
                                } else {
                                    setGetAllScrappedPosts(true);
                                }
                            }}
                        >
                            {!getAllScrappedPosts ? "모두 보기" : "접기"}
                        </Button>
                    </Stack>
                    {getAllScrappedPosts ? (
                        <Stack>
                            {scrappedPostLists.map((course) => {
                                return (
                                    <CourseCard
                                        key={course.mapId}
                                        postId={course.mapId}
                                        variant={"course"}
                                        mapImage={course.mapImage}
                                        course={course}
                                    >
                                        {course}
                                    </CourseCard>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Stack>
                            {scrappedPostLists?.slice(0, 3).map((course) => {
                                return (
                                    <CourseCard
                                        key={course.mapId}
                                        postId={course.mapId}
                                        variant={"course"}
                                        mapImage={course.mapImage}
                                        course={course}
                                    >
                                        {course}
                                    </CourseCard>
                                );
                            })}
                        </Stack>
                    )}
                    <Box>
                        <Stack
                            sx={{ my: 2 }}
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography variant="h6">
                                내가 공유한 코스
                            </Typography>
                            <Button
                                onClick={() => {
                                    if (getAllSharedPosts) {
                                        setGetAllSharedPosts(false);
                                    } else {
                                        setGetAllSharedPosts(true);
                                    }
                                }}
                            >
                                {!getAllSharedPosts ? "모두 보기" : "접기"}
                            </Button>
                        </Stack>
                        {getAllSharedPosts ? (
                            <Stack>
                                {mySharedPostLists?.map((course) => {
                                    return (
                                        <CourseCard
                                            key={course.postId}
                                            postId={course.postId}
                                            variant={"my_post"}
                                        >
                                            {course.postTitle}
                                        </CourseCard>
                                    );
                                })}
                            </Stack>
                        ) : (
                            <Stack>
                                {mySharedPostLists
                                    ?.slice(0, 3)
                                    .map((course) => {
                                        return (
                                            <CourseCard
                                                key={course.postId}
                                                postId={course.postId}
                                                variant={"my_post"}
                                            >
                                                {course.postTitle}
                                            </CourseCard>
                                        );
                                    })}
                            </Stack>
                        )}
                    </Box>
                    {/* <Stack direction="column">{renderCourseCardRows()}</Stack> */}
                </Stack>
            </Box>
        </>
    );
}

export default MyPage;
