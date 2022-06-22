import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../config/http";

export const loginAction = createAsyncThunk("login/req", ({ data, cb }) => {
  return http.post("/user/login", data).then((res) => {
    if (res.data.success) cb();
    return res.data;
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    logout: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [loginAction.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.token = payload.token;
        state.user = payload.user;
      }
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
