import { ArrowBack } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";

function Topbar(props) {
    const { children, pageInfo, isBackButton, ...rest } = props;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar>
                            <ArrowBack />
                            <Typography {...rest}>{children}</Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
}

export default Topbar;
