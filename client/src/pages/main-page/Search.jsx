import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import {
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

const Search = ({ setLat, setLon }) => {
    const [keyword, setKeyword] = useState("");
    const [places, setPlaces] = useState([]);
    const [showPlacesList, setShowPlacesList] = useState(false); // 초기 상태를 false로 변경

    // searchTerm 상태 삭제 및 useEffect 내부에서 keyword 직접 사용
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (keyword) {
                searchPlaces();
            }
        }, 100); // keyword 상태 직접 사용

        return () => clearTimeout(delayDebounce);
    }, [keyword]); // keyword가 변경될 때마다 이 effect를 실행

    const searchPlaces = async () => {
        if (!keyword.trim()) {
            alert("키워드를 입력해주세요!");
            return;
        }

        // 가정: Kakao Maps API를 사용한 장소 검색 예제
        // 실제 API 호출 코드는 서비스의 API 문서에 따라 달라질 수 있습니다.
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const topFivePlaces = data.slice(0, 5);
                setPlaces(topFivePlaces);
                setShowPlacesList(true); // 결과가 있을 때만 목록을 표시
            } else {
                setPlaces([]);
                setShowPlacesList(false);
            }
        });
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleItemClick = (place) => {
        setLat(place.y);
        setLon(place.x);
        setShowPlacesList(false); // 클릭 시 리스트 숨김
    };

    return (
        <div className="map_wrap">
            <Paper
                elevation={3}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                }}
            >
                <TextField
                    id="search-box"
                    label=""
                    variant="outlined"
                    size="medium"
                    value={keyword}
                    onChange={handleInputChange}
                    placeholder="지역검색"
                    sx={{
                        border: 2,
                        borderColor: "#6389BE",
                        borderRadius: 1,

                        m: 1,
                        width: "96%",
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{
                                        color: "#6389BE",
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                {showPlacesList && (
                    <List
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            maxHeight: "50vh",
                            overflowY: "auto",
                            bgcolor: "background.paper",
                        }}
                    >
                        {places.map((place, index) => (
                            <ListItem
                                key={index}
                                onClick={() => handleItemClick(place)}
                            >
                                <ListItemIcon>
                                    <PlaceIcon
                                        sx={{
                                            color: "#6389BE",
                                            fontSize: "2.5rem",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            noWrap
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {place.place_name}
                                        </Typography>
                                    }
                                    secondary={
                                        place.road_address_name ||
                                        place.address_name
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </div>
    );
};

export default Search;
