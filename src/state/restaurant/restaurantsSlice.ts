import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IRestaurant } from "../../types/types";
import { RootState } from "../store";
import { fetchRestaurants } from "./restaurantThunk";

export interface RestaurantsState {
  value: IRestaurant[];
}

const initialState: RestaurantsState = {
  value: [],
};

axios.defaults.baseURL = "http://localhost:3000/v1";

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchRestaurants.fulfilled,
      (state, action: PayloadAction<IRestaurant[]>) => {
        state.value = action.payload;
      }
    );
  },
});

export const restaurantsSelector = (state: RootState) =>
  state.restaurants.value;

export default restaurantsSlice.reducer;
