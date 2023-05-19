import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseResponseProps, ITiersFields } from '@interfaces';
import { RootState } from '.';
import { fetchTierList } from '../actions';

interface IInitialState {
  orderCustomer?: any;
  orderProducts?: any;
  orderStore?: any;
}

const initialState: IInitialState = {
  orderCustomer: undefined,
  orderProducts: [],
  orderStore: undefined,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderCustomer: (state, action: PayloadAction<any>) => {
      state.orderCustomer = action.payload;
    },
    setOrderProducts: (state, action: PayloadAction<any>) => {
      state.orderProducts = action.payload;
    },
    setOrderStore: (state, action: PayloadAction<any>) => {
      state.orderStore = action.payload;
    },
    resetOrder: () => {
      return initialState;
    },
  },
});

export const selectOrder = (state: RootState) => state.order;
export const selectOrderCustomer = (state: RootState) => state.order.orderCustomer;
export const selectOrderStore = (state: RootState) => state.order.orderStore;
export const selectOrderProducts = (state: RootState) => state.order.orderProducts;

export const { setOrderCustomer, setOrderProducts, setOrderStore, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
