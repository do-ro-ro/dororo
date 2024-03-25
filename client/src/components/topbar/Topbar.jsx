import { ArrowBack } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Topbar(props) {
    const { children, pageInfo, isBackButton, ...rest } = props;

    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="inherit">
                    <Container maxWidth="xl">
                        <Toolbar>
                            {isBackButton ? (
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={() => navigate(-1)}
                                >
                                    <ArrowBack />
                                </IconButton>
                            ) : null}
                            <Typography
                                {...rest}
                                variant="h6"
                                sx={{ flexGrow: 1, textAlign: "center" }}
                            >
                                {children}
                            </Typography>
                            {isBackButton ? (
                                <div style={{ width: 24 }} />
                            ) : null}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
}

export default Topbar;
