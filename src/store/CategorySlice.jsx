import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";
import { closeModal } from "./RootSlice";

export const fetchCategories = createAsyncThunk(
  "users/fetchCategories",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("/categories", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "users/fetchCategory",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`/categories`, item);
      dispatch(closeModal(true));
      dispatch(fetchCategories());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "users/updateCategory",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/categories/${item._id}`, item);
      dispatch(closeModal(true));
      dispatch(fetchCategories());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "users/deleteCategory",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/categories/${id}`);
      dispatch(fetchCategories());

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  categories: [],
  user: {},
  loading: false,
  error: null,
  count: 0,
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      FireToast("success", "Category Added Successfully");
      state.user = action.payload.data;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      FireToast("success", "Category Updated Successfully");
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      FireToast("warning", "Category Deleted Successfully");
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = CategorySlice.actions;
export default CategorySlice.reducer;
