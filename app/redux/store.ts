'use client';

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import statsReducer from './statsSlice';
import productsSlice from './productsSlice';
import pricesSlice from './pricesSlice';

export const store = configureStore({
  reducer: {
    data: statsReducer,
    product: productsSlice,
    prices: pricesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
