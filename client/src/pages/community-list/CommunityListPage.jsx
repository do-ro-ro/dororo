import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import Topbar from "../../components/topbar/Topbar";

function CommunityListPage() {
    return (
        <>
            <Box>
                <Topbar>커뮤니티</Topbar>

                <Stack mx={4} mt={2}>
                    <Typography>실시간 인기 코스 Top 3</Typography>
                    <Card sx={{ width: "30vw", height: "20vh" }}>
                        <CardMedia />
                        <CardContent>
                            <Typography>코스이름</Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </>
    );
}

export default CommunityListPage;
