import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    userId: "63701cc1f03239b7f700000e",
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        }
    }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;