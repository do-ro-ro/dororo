import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import SampleCourseImg from "../../assets/sample_course_img.png";

function CourseCard(props) {
    const { children, ...rest } = props;
    return (
        <>
            <Card
                sx={{
                    width: "30vw",
                    height: "20vh",
                    mx: 1,
                }}
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
