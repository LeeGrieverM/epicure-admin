import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDish } from "../../types/types";
import { RootState } from "../store";
import { fetchDishes } from "./dishThunk";

export interface DishesState {
  value: IDish[];
}

const initialState: DishesState = {
  value: [],
};

const dishesSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchDishes.fulfilled,
      (state, action: PayloadAction<IDish[]>) => {
        state.value = action.payload;
      }
    );
  },
});

export const dishesSelector = (state: RootState) => state.dishes.value;

export default dishesSlice.reducer;
