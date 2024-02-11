import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { ICatStore } from "../../models/store.models";
import { maxPages, pageLimit } from "../../constants";
import { RootState } from "..";

const initialState: ICatStore = {
  cats: [],
  page: 0,
  isLoading: false,
  loaded: false,
};

const catStateSlice = createSlice({
  name: "catsState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCats.fulfilled, (state, action) => {
        const { cats, page } = action.payload;
        return {
          cats: [...state.cats, ...cats],
          page,
          isLoading: false,
          loaded: page >= maxPages ? true : false,
        };
      })
      .addCase(getCats.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getCats.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

export const getCats = createAsyncThunk(
  "catsState/getCats",
  async (_, { getState }) => {
    try {
      const { cats } = getState() as RootState;

      const nextPage = cats.page + 1;

      const response = await axiosInstance.get(
        `https://api.thecatapi.com/v1/images/search?limit=${pageLimit}&page=${
          cats.page + 1
        }`
      );

      return { cats: response.data, page: nextPage };
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      console.error("Error while fetching registration state");
      return { error: true, backendErrorMessage: backendMessage };
    }
  }
);

export default catStateSlice.reducer;
