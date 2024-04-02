import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import { useNavigate } from "react-router-dom";
import {
    Bookmark,
    Cancel,
    CheckCircle,
    MapOutlined,
    NearMeRounded,
} from "@mui/icons-material";

function CourseCard(props) {
    const { children, postId, variant, course, ...rest } = props;

    console.log("코스카드 코스", course);
    // 클릭시 이동을 위한 navigate
    const navigate = useNavigate();
    const handleNavigate = (postId) => {
        if (variant === "post") {
            navigate(`${postId}`);
        } else if (variant === "my_post") {
            navigate(`/main/community/${postId}`);
        } else {
            navigate(`/course/${postId}`);
        }
    };

    return (
        <>
            <Card
                sx={{
                    width: "80vw",
                    height: "10vh",
                    m: 2,
                    display: "flex",
                }}
                onClick={() => handleNavigate(`${postId}`)}
            >
                <Stack
                    sx={{ width: "100vw" }}
                    direction={"row"}
                    justifyContent={"space-between"}
                    // alignContent={"space-between"}
                >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{
                                width: "30px",
                                backgroundColor:
                                    course?.mapType === "CUSTOM"
                                        ? "#F1EAC7"
                                        : "#6386BE",
                            }}
                        >
                            <MapOutlined
                                color={
                                    course?.mapType === "CUSTOM"
                                        ? "primary"
                                        : "white"
                                }
                                sx={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        </Box>
                        <Box>
                            <Stack justifyItems={"center"}>
                                <Typography
                                    sx={{
                                        textOverflow: "clip",
                                        overflow: "hidden",
                                        fontSize: "1.25rem",
                                        fontWeight: "500",
                                        px: 1,
                                        py: 0.5,
                                    }}
                                >
                                    {variant === "post"
                                        ? children
                                        : course?.mapName === ""
                                        ? "제목없음"
                                        : course?.mapName}
                                </Typography>
                                {variant === "post" ? (
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        sx={{ px: 1 }}
                                    >
                                        <Typography sx={{}}>
                                            {course?.userNickName}
                                        </Typography>
                                    </Stack>
                                ) : (
                                    <Stack
                                        direction={"row"}
                                        sx={{ px: 1, py: 1 }}
                                    >
                                        <NearMeRounded color="primary" />
                                        <Typography sx={{ py: 0.2 }}>
                                            {course?.mapDistance + "km"}
                                        </Typography>
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                        {variant === "post" ? (
                            <Stack alignItems={"center"} sx={{}}>
                                <Bookmark
                                    color="primary"
                                    sx={{ width: "20vw", height: "5vh" }}
                                />
                                <Typography>{course?.scrapCount}</Typography>
                            </Stack>
                        ) : course?.mapCompletion ? (
                            <CheckCircle
                                sx={{ width: "20vw", height: "5vh" }}
                                color="success"
                            />
                        ) : (
                            <Cancel
                                sx={{ width: "20vw", height: "5vh" }}
                                color="error"
                            />
                        )}
                    </Box>
                </Stack>
            </Card>
        </>
    );
}

export default CourseCard;
