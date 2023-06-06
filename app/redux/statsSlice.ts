'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { StatsProps } from '../types/statsProps';

const initialState: StatsProps = {
  data: null,
  loading: false,
  error: false,
};

// TODO: update w/ real API
const base = 'http://localhost:4000';

export const fetchData = createAsyncThunk(
  'stats/fetchData',
  async ({ interval }: { interval: string }) => {
    const response = await axios.get(`${base}/data`);
    console.log(response);
    return response.data;
  },
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default statsSlice.reducer;

// TODO: set up w/ real API
/*
export const fetchData = createAsyncThunk(
  'stats/fetchData',
  async ({ interval }: { interval: string }) => {
    const response = await axios.post(
      `${base}/data`,
      {
        interval: interval,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
);
*/
