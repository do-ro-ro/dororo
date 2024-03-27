const CourseInfo = ({ courseInfo, currentIndex }) => {
    return (
        <div>
            <div>
                <p>코스 {currentIndex + 1}</p>
                <p>주행시간{courseInfo.time}</p>
                <p>주행 거리 {courseInfo.distance}</p>
            </div>
        </div>
    );
};

export default CourseInfo;
