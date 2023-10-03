import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";

export const fetchAds = createAsyncThunk(
  "users/fetchAds",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("/ads", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  ads: [],
  loading: false,
  error: null,
  count: 0,
};

const AdSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.ads = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = AdSlice.actions;
export default AdSlice.reducer;
