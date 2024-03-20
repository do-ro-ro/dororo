import React, { useState, useEffect } from "react";

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
                }}
            >
                <span className={`markerbg marker_${index + 1}`}></span>
                <div className="info">
                    <h5>{place.place_name}</h5>
                    {place.road_address_name ? (
                        <>
                            <span>{place.road_address_name}</span>
                            <span className="jibun gray">
                                {place.address_name}
                            </span>
                        </>
                    ) : (
                        <span>{place.address_name}</span>
                    )}
                    <span className="tel">{place.phone}</span>
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
                        키워드 :
                        <input
                            type="text"
                            value={keyword}
                            onChange={handleInputChange}
                            size="15"
                        />
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
