import { createSlice } from "@reduxjs/toolkit";

export const basicNavbarSlice = createSlice({
    name: "basicnavbar",
    initialState: {
        value: 1,
    },
    reducers: {
        changeValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeValue } = basicNavbarSlice.actions;

export default basicNavbarSlice.reducer;
