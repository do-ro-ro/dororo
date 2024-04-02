import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
    const { children, postId, variant, ...rest } = props;

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
                    width: "100px",
                    height: "20vh",
                    m: 1,
                }}
                onClick={() => handleNavigate(`${postId}`)}
            >
                {/* <CardMedia sx={{ height: "8rem" }} image={mapImage} /> */}
                <Box
                    component={"div"}
                    sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        px: 1,
                        py: 0.2,
                    }}
                >
                    {children}
                </Box>
            </Card>
        </>
    );
}

export default CourseCard;
