import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    user: null
}

const authSlicer = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            if (action.payload) {
                localStorage.setItem("token", action.payload)
            }
            else {
                localStorage.removeItem("token")
            }
            state.token = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        SetUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setIsLoggedIn, setToken, SetUser } = authSlicer.actions

export default authSlicer.reducer