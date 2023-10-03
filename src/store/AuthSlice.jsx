import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";
import Router from "next/router";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      FireToast("success", "Login Success");
      Router.push("/admin");
      return response.data;
    } catch (err) {
      FireToast("error", err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {});
  },
});

export default AuthSlice.reducer;
