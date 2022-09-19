import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cartSlice from '../features/cartSlice';
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook

export default store;
