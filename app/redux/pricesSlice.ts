'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PricesProps } from '../types/PricesDataProps';

const initialState: PricesProps = {
  prices: null,
  loading: false,
  error: false,
};

const base = 'https://prod.vertexprotocol-backend.com';

export const fetchPrices = createAsyncThunk('stats/fetcPrices', async () => {
  const response = await axios.get(`${base}/query?type=all_products`);
  console.log(response);
  return response.data;
});

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
