import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChef } from "../../types/types";
import { RootState } from "../store";
import { fetchChefs } from "./chefThunk";

export interface ChefsState {
  value: IChef[];
}

const initialState: ChefsState = {
  value: [],
};

const chefsSlice = createSlice({
  name: "chef",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchChefs.fulfilled,
      (state, action: PayloadAction<IChef[]>) => {
        state.value = action.payload;
      }
    );
  },
});

export const chefsSelector = (state: RootState) => state.chefs.value;

export default chefsSlice.reducer;
