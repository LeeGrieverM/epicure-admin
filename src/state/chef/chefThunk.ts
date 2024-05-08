import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChef } from "../../types/types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/v1";

export const fetchChefs = createAsyncThunk(
  "chefs/fetchChefs",
  async (): Promise<IChef[]> => {
    const response = await axios.get<IChef[]>("/chefs");
    return response.data;
  }
);
