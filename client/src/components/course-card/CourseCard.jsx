import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import SampleCourseImg from "../../assets/sample_course_img.png";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
    const { children, postId, ...rest } = props;

    // 클릭시 이동을 위한 navigate
    const navigate = useNavigate();
    const handleNavigate = (postId) => {
        navigate(`${postId}`);
    };

    return (
        <>
            <Card
                sx={{
                    width: "30vw",
                    height: "20vh",
                    mx: 1,
                }}
                onClick={() => handleNavigate(`${postId}`)}
            >
                <CardMedia sx={{ height: "8rem" }} image={SampleCourseImg} />
                <CardContent>
                    <Box
                        component={"div"}
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                        }}
                    >
                        {children}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default CourseCard;
