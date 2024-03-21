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
import { useState } from "react";

const DummyCourse = {
    post_id: 0,
    post_title: "코스 샘플 1",
    post_content: "내용",
    updated_at: "2024-03-21",
    scrap_count: 10,
    user_id: 1,
};

const DummyUser = {
    user_id: 1,
    name: "김싸피",
    nickname: "녹산동레이서",
    profile_image: BasicProfile,
};

function CommunityDetailPage() {
    const { postId } = useParams();
    const [isScrapped, setIsScrapped] = useState(false);
    const [scrapCount, setScrapCount] = useState(DummyCourse.scrap_count);

    // snack바 관련
    const [scrapSnackbarOpen, setScrapSnackbarOpen] = useState(false);

    // 스크랩 버튼 클릭시
    // const handleScrapClick = () => {

    // };

    // 스낵바 닫기
    const handleScrapSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setScrapSnackbarOpen(false);
    };

    return (
        <>
            <Box>
                <Topbar>커뮤니티</Topbar>
                <Stack
                    m={2}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignContent={"space-between"}
                >
                    <Box>
                        <Typography variant="h5">
                            {DummyCourse.post_title}
                        </Typography>
                        <Stack direction={"row"}>
                            <Avatar
                                src={BasicProfile}
                                sx={{ width: 24, height: 24, mr: 1 }}
                            >
                                김
                            </Avatar>
                            <Typography>{DummyUser.nickname}</Typography>
                        </Stack>
                    </Box>
                    {DummyCourse.user_id === DummyUser.user_id ? (
                        <Stack direction={"row"} alignItems={"center"}>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ height: "3vh", width: "3vw", mx: 0.3 }}
                            >
                                수정
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{ height: "3vh", width: "4vw", mx: 0.3 }}
                            >
                                삭제
                            </Button>
                        </Stack>
                    ) : null}
                </Stack>
                <Box>
                    {/* 나중에 지도 넣어줄 영역 */}
                    <img width={"100%"} src={SampleCourseImg} />
                </Box>

                <Box m={2}>
                    {!isScrapped ? (
                        <IconButton
                            size={"large"}
                            onClick={() => {
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
                    <Typography>{DummyCourse.post_content}</Typography>
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
