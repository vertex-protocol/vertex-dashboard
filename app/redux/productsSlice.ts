'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProductsProps } from '../types/productsProps';
import { ChainType } from '@/app/types/types';
import { VERTEX_API_LINKS } from '@/app/consts';

const initialState: ProductsProps = {
  products: null,
  loading: false,
  error: false,
};

export const fetchProducts = createAsyncThunk(
  'stats/fetcProducts',
  async ({ chain }: { chain: ChainType }) => {
    const baseUrl = VERTEX_API_LINKS[chain].gateway;

    const response = await axios.get(`${baseUrl}/symbols`);
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
