import { AccountBox, AddRoad, Forum, Palette } from "@mui/icons-material";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeValue } from "../../features/basicNavbarSlice";

function BasicNavbar() {
    // 리덕스 사용을 위한 selector, dispatch 설정
    const value = useSelector((state) => state.basicnavbar.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    return (
        <>
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    py: "1vh",
                }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        dispatch(changeValue(newValue)); // Redux 상태 변경
                        switch (newValue) {
                            case 0:
                                navigate("/main/community");
                                break;
                            case 1:
                                navigate("/main/recommend");
                                break;
                            case 2:
                                navigate("/main/myPage/123"); // 예시 userId
                                break;
                            default:
                                navigate("/main/recommend");
                                break;
                        }
                    }}
                >
                    <BottomNavigationAction label="커뮤니티" icon={<Forum />} />
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
        </>
    );
}

export default BasicNavbar;
