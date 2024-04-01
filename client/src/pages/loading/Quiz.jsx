import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const Quiz = () => {
    const quizData = [
        {
            question:
                "React는 Facebook에서 개발한 JavaScript 라이브러리입니다.",
            correctAnswer: "O",
            explanation:
                "React는 Facebook의 소프트웨어 엔지니어링 팀에 의해 개발되었습니다.",
        },
        {
            question: "HTML은 프로그래밍 언어입니다.",
            correctAnswer: "X",
            explanation: "HTML은 마크업 언어이며, 프로그래밍 언어가 아닙니다.",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [explanation, setExplanation] = useState("");

    const currentQuestion = quizData[currentQuestionIndex];

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer !== currentQuestion.correctAnswer) {
            setExplanation(currentQuestion.explanation);
        } else {
            setExplanation("");
            if (currentQuestionIndex < quizData.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5">{currentQuestion.question}</Typography>
            <Box sx={{ marginTop: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => handleAnswerClick("O")}
                    sx={{
                        marginRight: 2,
                        color: "black",
                        backgroundColor: "white",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                        border: "1px solid black",
                    }}
                >
                    O
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleAnswerClick("X")}
                    sx={{
                        color: "black",
                        backgroundColor: "white",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                        border: "1px solid black",
                    }}
                >
                    X
                </Button>
            </Box>
            {selectedAnswer && explanation && (
                <Typography
                    variant="subtitle1"
                    sx={{ marginTop: 2, color: "red" }}
                >
                    {explanation}
                </Typography>
            )}
        </Box>
    );
};

export default Quiz;
