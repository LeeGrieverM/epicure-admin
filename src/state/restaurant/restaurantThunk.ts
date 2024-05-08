import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRestaurant } from "../../types/types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/v1";

export const fetchRestaurants = createAsyncThunk(
    "restaurants/fetchRestaurants",
    async (): Promise<IRestaurant[]> => {
      const response = await axios.get<IRestaurant[]>("/restaurants");
      return response.data;
    }
  );