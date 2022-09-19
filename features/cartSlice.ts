import { createSlice } from '@reduxjs/toolkit';
import { ICartItems } from '../ts/interfaces/interfaces';
import { saveToSessionStorage, cleanSessionStorage } from '../utils/functions';

const initialState: ICartItems = {
  values: [],
  total: 0,
  discount: 0,
  cupom: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getFromSessionStorage: (state, action) => {
      state.values = action.payload.values;
      state.cupom = action.payload.cupom;
      state.discount = action.payload.discount;
      state.total = action.payload.total;
    },

    addToCart: (state, action) => {
      const exists = state.values.find(
        (item) => item.productId === action.payload.productId
      );

      if (exists) {
        const existOptions = {
          notes: exists.notes?.trim(),
          options: exists.options,
        };
        const payloadOptions = {
          notes: action.payload.notes?.trim(),
          options: action.payload.options,
        };

        if (JSON.stringify(existOptions) === JSON.stringify(payloadOptions)) {
          exists.totalAmt += action.payload.totalAmt;
          exists.totalQty += action.payload.totalQty;
          const newState = state.values.map((item) =>
            item.orderId === exists.orderId ? exists : item
          );
          state.values = newState;
        } else {
          state.values.push(action.payload);
        }
      } else {
        state.values.push(action.payload);
      }
      state.total = state.values.reduce(
        (prev, curr) => prev + curr.totalAmt,
        0
      );

      saveToSessionStorage(state);
    },
    removeFromCart: (state, action) => {
      state.values.forEach((item, index) => {
        if (item.orderId === action.payload.orderId) {
          state.values.splice(index, 1);
        }
      });

      state.total = state.values.reduce(
        (prev, curr) => prev + curr.totalAmt,
        0
      );
      saveToSessionStorage(state);
    },

    decreaseItem: (state, action) => {
      const newState = state.values.map((item) => {
        if (item.orderId === action.payload.orderId) {
          return {
            ...item,
            totalQty: item.totalQty - 1,
            totalAmt: (item.totalAmt / item.totalQty) * (item.totalQty - 1),
          };
        }

        return item;
      });
      state.values = newState;
      state.total = state.values.reduce(
        (prev, curr) => prev + curr.totalAmt,
        0
      );
      saveToSessionStorage(state);
    },

    increaseItem: (state, action) => {
      const newState = state.values.map((item) => {
        if (item.orderId === action.payload.orderId) {
          return {
            ...item,
            totalQty: item.totalQty + 1,
            totalAmt: (item.totalAmt / item.totalQty) * (item.totalQty + 1),
          };
        }

        return item;
      });
      state.values = newState;
      state.total = state.values.reduce(
        (prev, curr) => prev + curr.totalAmt,
        0
      );
      saveToSessionStorage(state);
    },

    addCupom: (state, action) => {
      state.cupom = action.payload;
      state.discount = 0.05;
      saveToSessionStorage(state);
    },

    cleanCart: (state) => {
      state.values = [];
      state.total = 0;
      state.discount = 0;
      state.cupom = null;
      cleanSessionStorage()
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseItem,
  increaseItem,
  addCupom,
  getFromSessionStorage,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
