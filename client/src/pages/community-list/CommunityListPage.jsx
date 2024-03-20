import { AccountBox, AddRoad, Forum } from "@mui/icons-material";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
} from "@mui/material";
import { useState } from "react";

function CommunityListPage() {
    const [value, setValue] = useState(1);
    return (
        <>
            <Box>
                <Paper
                    sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                    elevation={3}
                >
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction
                            label="커뮤니티"
                            icon={<Forum />}
                        />
                        <BottomNavigationAction
                            label="코스추천"
                            icon={<AddRoad />}
                        />
                        <BottomNavigationAction
                            label="마이페이지"
                            icon={<AccountBox />}
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    );
}

export default CommunityListPage;
