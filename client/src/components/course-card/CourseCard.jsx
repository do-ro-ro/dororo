import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import { useNavigate } from "react-router-dom";
import { MapOutlined } from "@mui/icons-material";

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
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{ width: "25vw", backgroundColor: "#6386BE" }}
                    >
                        <MapOutlined
                            color="white"
                            sx={{ width: "3rem", height: "3rem" }}
                        />
                    </Box>
                    {/* <CardMedia sx={{ width: "20vw" }} image={SampleCourseImg} /> */}
                    <Box component={"div"}>
                        <Typography
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                px: 1,
                                py: 0.2,
                            }}
                        >
                            {variant === "post" ? children : course?.mapName}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
}

export default CourseCard;
