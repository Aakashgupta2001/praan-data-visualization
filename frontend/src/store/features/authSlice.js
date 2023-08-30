import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//initial state
const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //setting users and storing user info with token in localstorage and setting isAuthenticated to true for enabling access to protected routes
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
    // clearing user data and setting isAuthenticated to false
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
