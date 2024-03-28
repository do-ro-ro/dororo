import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import CourseCard from "../../components/course-card/CourseCard";
import { useEffect, useState } from "react";
import { getMapPostsList } from "../../apis/server/Community";
// import { useNavigate } from "react-router-dom";

function CommunityListPage() {
    // 게시글 리스트 상태
    const [currentMapPostsList, setCurrentMapPostsList] = useState([]);

    // 컴포넌트 불러올 때 API 호출할 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMapPostsList();
                const updatedMapPostsList = response;
                // console.log(response);
                setCurrentMapPostsList(updatedMapPostsList);
                console.log(updatedMapPostsList);
                console.log(currentMapPostsList);
            } catch (error) {
                console.error("게시글 리스트 불러오기 실패", error);
            }
        };

        fetchData();
    }, []);

    // Top3 코스
    const top3Courses = currentMapPostsList
        .sort((a, b) => b.scrapCount - a.scrapCount)
        .slice(0, 3);

    const [isActivated, setIsActivated] = useState(true);

    // 최신순 정렬된 리스트
    const sortLatest = currentMapPostsList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    // 인기순 정렬된 리스트
    const popularCourses = currentMapPostsList.sort(
        (a, b) => b.scrapCount - a.scrapCount,
    );

    // 가로로 3개씩 줄을 나누는 함수
    const chunkArray = (arr, size) => {
        return arr.reduce((acc, _, i) => {
            if (i % size === 0) {
                acc.push(arr.slice(i, i + size));
            }
            return acc;
        }, []);
    };

    // 줄 단위로 CourseCard 요소를 생성하는 함수
    const renderCourseCardRows = () => {
        const coursesToDisplay = isActivated ? sortLatest : popularCourses;
        const chunkedCourses = chunkArray(coursesToDisplay, 3); // 3개씩 묶기
        return chunkedCourses.map((chunk, index) => (
            <Stack key={index} direction="row">
                {chunk.map((course) => (
                    <CourseCard
                        postId={course.postId}
                        key={course.postId}
                        variant={"post"}
                        mapImage={course.mapImage}
                        userName={course.userName}
                    >
                        {course.postTitle}
                    </CourseCard>
                ))}
            </Stack>
        ));
    };

    return (
        <>
            <Box>
                <Topbar>커뮤니티</Topbar>

                <Stack mx={4} mt={2}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        실시간 인기 코스 Top 3
                    </Typography>
                    <Stack direction={"row"}>
                        {top3Courses.map((course) => {
                            return (
                                <CourseCard
                                    key={course.postId}
                                    postId={course.postId}
                                    variant={"post"}
                                    mapImage={course.mapImage}
                                    userName={course.userName}
                                >
                                    {course.postTitle}
                                </CourseCard>
                            );
                        })}
                    </Stack>
                    <Stack
                        sx={{ my: 2 }}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant="h6">코스 보기</Typography>
                        <Box>
                            <Button
                                variant={isActivated ? "contained" : "text"}
                                color="primary"
                                onClick={() => setIsActivated(true)}
                            >
                                최신순
                            </Button>
                            <Button
                                variant={isActivated ? "text" : "contained"}
                                color="primary"
                                onClick={() => setIsActivated(false)}
                            >
                                인기순
                            </Button>
                        </Box>
                    </Stack>
                    <Stack direction="column">{renderCourseCardRows()}</Stack>
                </Stack>
            </Box>
        </>
    );
}

export default CommunityListPage;
