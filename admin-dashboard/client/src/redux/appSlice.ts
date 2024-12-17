import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    activePage: string;
};

const initialState: AppState = {
    activePage: 'info'
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setActivePage: (state, action: PayloadAction<string>) => {
            state.activePage = action.payload;
        }
    }
});

export const { setActivePage } = appSlice.actions;
export default appSlice.reducer;