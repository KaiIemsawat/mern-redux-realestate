import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            // console.log(action);
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            // console.log(action);
            state.loading = false;
        },
    },
});

//  When call it, it's "action"
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
//  When change it, it's "reducer"
export default userSlice.reducer;
