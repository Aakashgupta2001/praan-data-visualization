import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("USER = ", action.payload.data);
      state.user = action.payload.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.data.token,
        })
      );
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      console.log("logouttttt, ", state);
      localStorage.clear();
      state.isAuthenticated = false;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
