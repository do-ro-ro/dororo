import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import CourseCard from "../../components/course-card/CourseCard";
import { useEffect, useState } from "react";
import { getMapPostsList } from "../../apis/server/Community";
// import { useNavigate } from "react-router-dom";

const DummyCourseList = [
    {
        post_id: 0,
        post_title: "코스 샘플 1",
        post_content: "내용",
        updated_at: "2024-03-21",
        scrap_count: 10,
    },
    {
        post_id: 1,
        post_title: "코스 샘플 2",
        post_content: "내용",
        updated_at: "2024-03-20",
        scrap_count: 14,
    },
    {
        post_id: 2,
        post_title: "코스 샘플 3",
        post_content: "내용",
        updated_at: "2024-03-19",
        scrap_count: 100,
    },
    {
        post_id: 3,
        post_title: "코스 샘플 4",
        post_content: "내용",
        updated_at: "2024-03-18",
        scrap_count: 30,
    },
    {
        post_id: 4,
        post_title: "코스 샘플 5",
        post_content: "내용",
        updated_at: "2024-03-17",
        scrap_count: 50,
    },
    {
        post_id: 5,
        post_title: "코스 샘플 6",
        post_content: "내용",
        updated_at: "2024-03-16",
        scrap_count: 20,
    },
];

function CommunityListPage() {
    // 게시글 리스트 상태
    const [currentMapPostsList, setCurrentMapPostsList] = useState([]);

    // 컴포넌트 불러올 때 API 호출할 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMapPostsList();
                const updatedMapPostsList = response.data;
                console.log(response);
                setCurrentMapPostsList(updatedMapPostsList);
            } catch (error) {
                console.error("게시글 리스트 불러오기 실패", error);
            }
        };

        fetchData();
    }, []);

    // Top3 코스
    const top3Courses = [...DummyCourseList]
        .sort((a, b) => b.scrap_count - a.scrap_count)
        .slice(0, 3);

    const [isActivated, setIsActivated] = useState(true);

    // 최신순 정렬된 리스트
    const sortLatest = [...DummyCourseList].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    );

    // 인기순 정렬된 리스트
    const popularCourses = [...DummyCourseList].sort(
        (a, b) => b.scrap_count - a.scrap_count,
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
                        postId={course.post_id}
                        key={course.post_id}
                        variant={"post"}
                    >
                        {course.post_title}
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
                                    key={course.post_id}
                                    postId={course.post_id}
                                    variant={"post"}
                                >
                                    {course.post_title}
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
