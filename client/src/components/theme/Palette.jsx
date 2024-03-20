import { createTheme } from "@mui/material";

// 색 지정할 Token
const colorTheme = createTheme({
    palette: {
        primary: {
            main: "#FF5733",
        },
        // 아래에 색 추가하시면 됩니다. MUI Tokens/Palette 참조
    },
});

export default colorTheme;
