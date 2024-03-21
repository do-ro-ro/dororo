import { Button } from "@mui/material";

const RecommendButton = ({ openModal }) => {
    return (
        <>
            <Button
                onClick={openModal}
                variant="contained"
                sx={{
                    width: "15rem",
                    height: "4rem",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    animation: "moveUpDown 2s ease-in-out infinite",
                    "@keyframes moveUpDown": {
                        "0%, 100%": {
                            transform: "translateY(0)",
                        },
                        "50%": {
                            transform: "translateY(-10px)",
                        },
                    },
                }}
            >
                코스 추천
            </Button>
        </>
    );
};

export default RecommendButton;
