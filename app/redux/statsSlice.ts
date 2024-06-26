'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { VERTEX_API_LINKS } from '@/app/consts';

import { StatsProps } from '../types/statsProps';
import { ChainType } from '@/app/types/types';

const initialState: StatsProps = {
  snapshots: null,
  loading: false,
  error: false,
};

interface Props {
  interval: string;
  chain: ChainType;
}

export const fetchData = createAsyncThunk(
  'stats/fetchData',
  async ({ interval, chain }: Props) => {
    const isAll = interval === 'all';
    const intInterval = isAll ? 100 : parseInt(interval);
    const granularity = isAll ? 604800 : 86400;

    const baseUrl = VERTEX_API_LINKS[chain].archive;

    const response = await axios.post(
      `${baseUrl}`,
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
