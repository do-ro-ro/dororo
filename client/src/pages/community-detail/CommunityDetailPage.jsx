import {
    Avatar,
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import BasicProfile from "../../assets/user_profile_basic.png";
import { Bookmark, BookmarkBorder, Image } from "@mui/icons-material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import { useEffect, useState } from "react";
import EditArticleModal from "../../components/community-detail/EditArticleModal";
import DeleteDialog from "../../components/community-detail/DeleteDialog";
import {
    cancelScrapMapPosts,
    getMapPosts,
    scrapMapPosts,
} from "../../apis/server/Community";
import Map from "../../components/course-detail/Map";
import { getMapDetail } from "../../apis/server/Map";

function CommunityDetailPage() {
    const { postId } = useParams();
    const [currentMapPosts, setCurrentMapPosts] = useState(null);
    const [currentCourse, setCurrentCourse] = useState(null);

    const [isScrapped, setIsScrapped] = useState(false);
    const [scrapCount, setScrapCount] = useState(0);

    useEffect(() => {
        // console.log(postId);
        const fetchData = async () => {
            try {
                const response = await getMapPosts(postId);
                const updatedMapPosts = response;
                // console.log(response);
                setCurrentMapPosts(updatedMapPosts);
                setScrapCount(updatedMapPosts.scrapCount);
                setIsScrapped(updatedMapPosts.isScraped);
                console.log(updatedMapPosts);
                // console.log(currentMapPosts);
            } catch (error) {
                console.error("게시글 리스트 불러오기 실패", error);
            }
        };

        fetchData();
    }, []);

    // 게시글 정보를 받아오면, Map 정보 받아오기
    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await getMapDetail(currentMapPosts?.mapId);
                const updatedCourse = response;
                // console.log(response);
                setCurrentCourse(updatedCourse);
                // console.log(updatedMapPosts);
                // console.log(currentMapPosts);
            } catch (error) {
                console.error("코스 정보 불러오기 실패", error);
            }
        };

        fetchMapData();
        // console.log(currentCourse);
    }, [currentMapPosts]);

    // snack바 상태 관리
    const [scrapSnackbarOpen, setScrapSnackbarOpen] = useState(false);

    // 스낵바 닫기
    const handleScrapSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setScrapSnackbarOpen(false);
    };

    return (
        <>
            <Topbar isBackButton={true}>커뮤니티</Topbar>
            <Box mt={10}>
                <Stack
                    m={2}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignContent={"space-between"}
                >
                    <Box>
                        <Typography variant="h5">
                            {currentMapPosts
                                ? currentMapPosts.postTitle
                                : "게시글을 불러오는 중입니다."}
                        </Typography>
                        <Stack direction={"row"}>
                            <Avatar
                                src={
                                    currentMapPosts?.profileImage ||
                                    "https://ssafy-dororo.s3.ap-northeast-2.amazonaws.com/user/blank-profile.png"
                                }
                                sx={{ width: 24, height: 24, mr: 1 }}
                            >
                                김
                            </Avatar>
                            <Typography>
                                {currentMapPosts
                                    ? currentMapPosts.userNickName
                                    : "닉네임을 불러오는 중입니다."}
                            </Typography>
                        </Stack>
                    </Box>
                    {currentMapPosts && currentMapPosts?.isMine === true ? (
                        <Stack direction={"row"} alignItems={"center"}>
                            {/* <EditArticleModal
                                currentMapPosts={currentMapPosts}
                            /> */}
                            <DeleteDialog
                                variant={"post"}
                                postId={Number(postId)}
                            />
                        </Stack>
                    ) : null}
                </Stack>
                <Box>
                    {/* 나중에 지도 넣어줄 영역 */}
                    {currentCourse ? (
                        <Map course={currentCourse} variant={"post"} />
                    ) : (
                        <Box>지도를 불러오는 중입니다</Box>
                    )}

                    {/* <img
                        width={"100%"}
                        src={currentMapPosts ? currentMapPosts.mapImage : ""}
                    /> */}
                </Box>

                <Box m={2}>
                    {!isScrapped ? (
                        <IconButton
                            size={"large"}
                            onClick={() => {
                                scrapMapPosts(postId);
                                setIsScrapped(true);
                                setScrapCount(scrapCount + 1);
                                setScrapSnackbarOpen(true);
                            }}
                        >
                            <BookmarkBorder color={"primary"} />{" "}
                        </IconButton>
                    ) : (
                        <IconButton
                            size={"large"}
                            onClick={() => {
                                cancelScrapMapPosts(postId);
                                setIsScrapped(false);
                                setScrapCount(scrapCount - 1);
                                setScrapSnackbarOpen(true);
                            }}
                        >
                            <Bookmark color={"primary"} />
                        </IconButton>
                    )}

                    <Typography fontWeight={"700"} sx={{ my: 1 }}>
                        스크랩 {scrapCount}개
                    </Typography>
                    <Typography>
                        {currentMapPosts
                            ? currentMapPosts.postContent
                            : "게시글을 불러오는 중입니다."}
                    </Typography>
                </Box>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={scrapSnackbarOpen}
                autoHideDuration={2500}
                onClose={handleScrapSnackbarClose}
                sx={{ mb: 10 }}
            >
                {isScrapped ? (
                    <Alert variant="filled" severity="success">
                        마이페이지로 스크랩되었습니다
                    </Alert>
                ) : (
                    <Alert variant="filled" severity="error">
                        스크랩이 취소되었습니다
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export default CommunityDetailPage;
