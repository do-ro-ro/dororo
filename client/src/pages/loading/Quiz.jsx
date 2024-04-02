import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Quiz = () => {
    const quizData = [
        {
            question: "안전벨트 착용은 뒷좌석 승객에게는 필수가 아닙니다.",
            correctAnswer: "X",
            explanation:
                "대부분의 국가에서는 운전자뿐만 아니라 모든 승객의 안전벨트 착용을 의무화하고 있습니다.",
        },
        {
            question: "비 오는 날에는 타이어 공기압을 낮추는 것이 좋습니다.",
            correctAnswer: "X",
            explanation:
                "비 오는 날이든 맑은 날이든 타이어 공기압은 제조사가 권장하는 수준으로 유지되어야 합니다.",
        },
        {
            question: "모든 교차로에서 우회전할 때는 정지하지 않아도 됩니다.",
            correctAnswer: "X",
            explanation:
                "우회전하기 전에는 항상 정지선에서 멈추고 교통 상황을 확인한 후 안전하게 진행해야 합니다.",
        },
        {
            question: "과속 카메라는 속도 위반만 감지합니다.",
            correctAnswer: "X",
            explanation:
                "일부 과속 카메라는 속도 위반뿐만 아니라 신호 위반 등 다른 교통 법규 위반도 감지할 수 있습니다.",
        },
        {
            question: "모든 교통 사고는 경찰에게 보고해야 합니다.",
            correctAnswer: "X",
            explanation:
                "사고의 심각성에 따라 다르지만, 대부분의 경미한 사고는 경찰 보고 없이 당사자 간 합의로 처리할 수 있습니다.",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [explanation, setExplanation] = useState("");

    useEffect(() => {
        let timer;
        if (
            selectedAnswer &&
            selectedAnswer !== quizData[currentQuestionIndex].correctAnswer
        ) {
            timer = setTimeout(() => {
                if (currentQuestionIndex < quizData.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer("");
                    setExplanation("");
                }
            }, 5000);
        }

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [selectedAnswer, currentQuestionIndex, quizData]);

    const currentQuestion = quizData[currentQuestionIndex];

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer !== currentQuestion.correctAnswer) {
            setExplanation(currentQuestion.explanation);
        } else {
            setExplanation("정답!"); // 정답일 경우 "정답!" 메시지 표시
            // 다음 질문으로 넘어가기 전에 설명과 선택된 답변을 초기화
            setTimeout(() => {
                if (currentQuestionIndex < quizData.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(""); // 다음 질문에서 버튼을 다시 클릭할 수 있게 함
                    setExplanation(""); // "정답입니다" 메시지를 제거
                }
            }, 4000); // 짧은 지연 후 다음 질문으로 넘어감
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: 2,
            }}
        >
            <Box>
                <LiveHelpIcon
                    sx={{ color: "#FFFFFF", fontSize: 40, mt: 3, mb: 1 }}
                />
                <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                    {currentQuestion.question}
                </Typography>
                <Box
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CheckBoxIcon
                        sx={{
                            color: "green",
                            fontSize: "3rem",
                            cursor: "pointer",
                        }}
                        onClick={() => handleAnswerClick("O")}
                    />
                    <DisabledByDefaultIcon
                        sx={{
                            color: "red",
                            fontSize: "3rem",
                            cursor: "pointer",
                            ml: 2,
                        }}
                        onClick={() => handleAnswerClick("X")}
                    />
                </Box>
                {selectedAnswer && explanation && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            marginTop: 2,
                            color: explanation === "정답!" ? "green" : "red",
                        }}
                    >
                        {explanation}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Quiz;
