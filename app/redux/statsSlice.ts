'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { StatsProps } from '../types/statsProps';

const initialState: StatsProps = {
  snapshots: null,
  loading: false,
  error: false,
};

const base = 'https://prod.vertexprotocol-backend.com';

export const fetchData = createAsyncThunk(
  'stats/fetchData',
  async ({ interval }: { interval: string }) => {
    const isAll = interval === 'all';
    const intInterval = isAll ? 100 : parseInt(interval);
    const granularity = isAll ? 604800 : 86400;

    const response = await axios.post(
      `${base}/indexer`,
      {
        market_snapshots: {
          interval: {
            count: intInterval,
            granularity: granularity,
            max_time: Date.now(),
          },
        },
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
        state.snapshots = action.payload;
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
