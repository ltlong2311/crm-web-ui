import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseResponseProps, ITiersFields } from '@interfaces';
import { RootState } from '.';
import { fetchTierList } from '../actions';

interface IInitialState {
  selectedCustomer?: any;
  selectedProduct?: any;
  selectedProducts?: any;
  selectedStore?: any;
}

const initialState: IInitialState = {
  selectedCustomer: undefined,
  selectedProduct: undefined,
  selectedProducts: [],
  selectedStore: undefined,
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<any>) => {
      state.selectedCustomer = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<any>) => {
      state.selectedProduct = action.payload;
    },
    setSelectedProducts: (state, action: PayloadAction<any>) => {
      state.selectedProducts = action.payload;
    },
    setSelectedStore: (state, action: PayloadAction<any>) => {
      state.selectedStore = action.payload;
    },
    resetSelected: () => {
      return initialState;
    },
  },
});

export const selectSelected = (state: RootState) => state.select;
export const selectSelectedCustomer = (state: RootState) => state.select?.selectedCustomer;
export const selectSelectedProduct = (state: RootState) => state.select?.selectedProduct;
export const selectSelectedProducts = (state: RootState) => state.select?.selectedProducts;
export const selectSelectedStore = (state: RootState) => state.select?.selectedStore;

export const {
  setSelectedCustomer,
  setSelectedProduct,
  setSelectedStore,
  setSelectedProducts,
  resetSelected,
} = selectSlice.actions;

export default selectSlice.reducer;
