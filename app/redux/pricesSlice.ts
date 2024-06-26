'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PricesProps } from '../types/PricesDataProps';
import { queryPrices } from '../hooks/queryPrices';
import { ChainType } from '@/app/types/types';
import { VERTEX_API_LINKS } from '@/app/consts';

const initialState: PricesProps = {
  prices: null,
  loading: false,
  error: false,
};

export const fetchPrices = createAsyncThunk(
  'stats/fetcPrices',
  async ({ chain }: { chain: ChainType }) => {
    const baseUrl = VERTEX_API_LINKS[chain].gateway;

    const response = await axios.get(`${baseUrl}/query?type=all_products`);
    const prices = queryPrices(response.data.data.spot_products);

    return prices;
  },
);

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.prices = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchPrices.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default pricesSlice.reducer;
