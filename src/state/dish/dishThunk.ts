import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDish } from "../../types/types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/v1";

export const fetchDishes = createAsyncThunk(
  "dishes/fetchDishes",
  async (): Promise<IDish[]> => {
    const response = await axios.get<IDish[]>("/dishes");
    return response.data;
  }
);
