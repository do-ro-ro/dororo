import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { Paper } from "@mui/material";
const Search = ({ setLat, setLon }) => {
    const [keyword, setKeyword] = useState("");
    const [places, setPlaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState(keyword);
    const [showPlacesList, setShowPlacesList] = useState(true); // 리스트 표시 여부를 위한 상태 추가

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm) {
                searchPlaces();
            }
        }, 100); // 500ms 지연

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]); // searchTerm이 변경될 때마다 이 effect를 실행

    // 키워드로 장소를 검색하는 함수
    const searchPlaces = () => {
        if (!keyword.trim()) {
            alert("키워드를 입력해주세요!");
            return;
        }

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                // 검색 결과 중 상위 5개만 저장
                const topFivePlaces = data.slice(0, 5);
                setPlaces(topFivePlaces);
            } else if (
                status === window.kakao.maps.services.Status.ZERO_RESULT
            ) {
                // alert("검색 결과가 존재하지 않습니다.");
                setPlaces([]);
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                // alert("검색 결과 중 오류가 발생했습니다.");
            }
        });
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
        setSearchTerm(e.target.value);
        setShowPlacesList(true);
    };
    // 항목 클릭 시 실행되는 함수
    const handleItemClick = (place) => {
        setLat(place.y);
        setLon(place.x);
        setShowPlacesList(false); // 클릭 시 리스트 숨김
    };

    // 검색결과 항목을 Element로 반환하는 함수
    const getListItem = (place, index) => {
        return (
            <li
                key={index}
                className="item"
                onClick={() => {
                    handleItemClick(place);
                    setKeyword(place.place_name);
                }}
            >
                <span className={`markerbg marker_${index + 1}`}></span>
                <div
                    className="info border-b border-gray-200 py-1 flex items-center space-x-2 
                "
                >
                    <div>
                        <PlaceIcon
                            sx={{ color: "#6389BE", fontSize: "35px", mx: 1 }}
                        />
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold  ">
                            {place.place_name}
                        </h5>
                        {place.road_address_name ? (
                            <>
                                <span className="text-sm text-gray-500">
                                    {place.road_address_name}
                                </span>
                                {/* <span className="jibun gray">
                                {place.address_name}
                            </span> */}
                            </>
                        ) : (
                            <span className="text-sm text-gray-500">
                                {place.address_name}
                            </span>
                        )}
                    </div>
                </div>
            </li>
        );
    };

    return (
        <div className="map_wrap">
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // searchPlaces();
                        }}
                    >
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
                                size="medium" // 필드 크기 조절 (small 또는 medium)
                                value={keyword}
                                onChange={handleInputChange}
                                placeholder="지역검색"
                                fullWidth // 필드를 부모 컨테이너의 전체 너비로 설정
                                sx={{
                                    border: 2,
                                    borderColor: "#6389BE",
                                    borderRadius: 1,
                                    mx: 1,
                                    my: 1,
                                    width: 95 / 100,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon
                                                sx={{ color: "#6389BE" }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Paper>
                        <div style={{ marginTop: "75px" }}></div>

                        {/* <button type="submit">검색하기</button> */}
                    </form>
                </div>
                <hr />
                {showPlacesList && (
                    <ul id="placesList">{places.map(getListItem)}</ul>
                )}
            </div>
        </div>
    );
};

export default Search;
