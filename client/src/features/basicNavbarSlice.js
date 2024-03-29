import { createSlice } from "@reduxjs/toolkit";

export const basicNavbarSlice = createSlice({
    name: "basicnavbar",
    initialState: {
        value: null,
    },
    reducers: {
        changeValue: (state, action) => {
            state.value = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeValue, setValue } = basicNavbarSlice.actions;

export default basicNavbarSlice.reducer;
