import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import CourseCard from "../../components/course-card/CourseCard";
import { useEffect, useState } from "react";
import { getMapPostsList } from "../../apis/server/Community";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function CommunityListPage() {
    // 게시글 리스트 상태
    const [currentMapPostsList, setCurrentMapPostsList] = useState([]);

    // 컴포넌트 불러올 때 API 호출할 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMapPostsList();
                const updatedMapPostsList = response.data;
                // console.log(response);
                setCurrentMapPostsList(updatedMapPostsList);
                console.log(updatedMapPostsList);
                // console.log(currentMapPostsList);
            } catch (error) {
                console.error("게시글 리스트 불러오기 실패", error);
            }
        };

        fetchData();
    }, []);

    // Top3 코스
    const top3Courses =
        currentMapPostsList.length > 0
            ? currentMapPostsList
                  .sort((a, b) => b.scrapCount - a.scrapCount)
                  .slice(0, 3)
            : null;

    const [isActivated, setIsActivated] = useState(true);

    // 최신순 정렬된 리스트
    const sortLatest =
        currentMapPostsList?.length > 0
            ? currentMapPostsList.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
              )
            : null;

    // 인기순 정렬된 리스트
    const popularCourses =
        currentMapPostsList?.length > 0
            ? currentMapPostsList.sort((a, b) => b.scrapCount - a.scrapCount)
            : null;

    const coursesToDisplay = isActivated ? sortLatest : popularCourses;

    const navigate = useNavigate();

    return (
        <>
            <Topbar>커뮤니티</Topbar>
            <Box pb={"10vh"} mt={"8vh"}>
                <Stack mx={4} mt={2}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        실시간 인기 코스 Top 3
                    </Typography>
                    <Stack>
                        {top3Courses?.map((course) => {
                            return (
                                <CourseCard
                                    key={course.postId}
                                    postId={course.postId}
                                    variant={"post"}
                                    course={course}
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
                    {/* <Stack direction="column">{renderCourseCardRows()}</Stack> */}
                    <Stack>
                        {currentMapPostsList.length > 0
                            ? coursesToDisplay.map((course) => {
                                  return (
                                      <CourseCard
                                          key={course.postId}
                                          postId={course.postId}
                                          variant={"post"}
                                          course={course}
                                      >
                                          {course.postTitle}
                                      </CourseCard>
                                      //   <Box
                                      //       key={course.postId}
                                      //       sx={{
                                      //           pt: 3,
                                      //           height: "8rem",
                                      //           borderBottom: 1,
                                      //           borderBottomColor: "lightgray",
                                      //       }}
                                      //       onClick={() =>
                                      //           navigate(`${course.postId}`)
                                      //       }
                                      //   >
                                      //       <Stack direction={"row"}>
                                      //           <Box sx={{ mr: 2 }}>
                                      //               <img
                                      //                   src={course.mapImage}
                                      //                   width={"100vw"}
                                      //               />
                                      //           </Box>
                                      //           <Stack>
                                      //               <Typography variant="subtitle1">
                                      //                   {course.postTitle}
                                      //               </Typography>
                                      //               <Typography variant="subtitle2">
                                      //                   {course.userNickName}
                                      //               </Typography>
                                      //               <Stack
                                      //                   direction={"row"}
                                      //                   sx={{ mt: 1 }}
                                      //               >
                                      //                   {course.isScraped ? (
                                      //                       <Bookmark color="primary" />
                                      //                   ) : (
                                      //                       <BookmarkBorder color="primary" />
                                      //                   )}
                                      //                   <Typography color="primary">
                                      //                       {course.scrapCount}
                                      //                   </Typography>
                                      //               </Stack>
                                      //           </Stack>
                                      //       </Stack>
                                      //   </Box>
                                  );
                              })
                            : "게시글을 불러오고 있습니다"}
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default CommunityListPage;
