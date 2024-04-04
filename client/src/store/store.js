import { configureStore } from "@reduxjs/toolkit";
import basicNavbarReducer from "../features/basicNavbarSlice";

export default configureStore({
    reducer: {
        basicnavbar: basicNavbarReducer,
    },
});
