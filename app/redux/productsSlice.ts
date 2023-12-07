'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProductsProps } from '../types/productsProps';

const initialState: ProductsProps = {
  products: null,
  loading: false,
  error: false,
};

const base = 'https://gateway.prod.vertexprotocol.com/v1';

export const fetchProducts = createAsyncThunk(
  'stats/fetcProducts',
  async () => {
    const response = await axios.get(`${base}/symbols`);
    return response.data;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;
