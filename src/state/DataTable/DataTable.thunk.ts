import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IRestaurant, IDish, IChef } from "../../types/types";
axios.defaults.baseURL = "http://localhost:3000/v1";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (url: string): Promise<IChef[] | IDish[]| IRestaurant[]> => {
    const response = await axios.get<(IChef[] | IDish[]| IRestaurant[])>(url);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (url: string): Promise<void> => {
    await axios.delete(url);
  }
);

export const restoreData = createAsyncThunk(
  "data/restoreData",
  async (url: string): Promise<void> => {
    await axios.put(url, { "isActive": true }); 
  }
);
