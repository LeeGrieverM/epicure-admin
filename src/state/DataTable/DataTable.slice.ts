import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { fetchData } from "./DataTable.thunk";
import { IChef, IDish, IRestaurant } from "../../types/types";
export interface DataState<T> {
  value: T[];
}

const initialState: DataState<IChef | IDish | IRestaurant> = {
  value: [],
};

axios.defaults.baseURL = "http://localhost:3000/v1";

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<(IChef| IDish| IRestaurant)[]>) => {
      state.value = action.payload;
    });
  },
});

export const dataSelector = (state: RootState) => state.data.value;

export default dataSlice.reducer;
