import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

interface IInitialState {
  chanceCustomer?: any;
  chanceProducts?: [];
}

const initialState: IInitialState = {
  chanceCustomer: undefined,
  chanceProducts: [],
};

const chanceSlice = createSlice({
  name: 'chance',
  initialState,
  reducers: {
    setChanceCustomer: (state, action: PayloadAction<any>) => {
      state.chanceCustomer = action.payload;
    },
    setChanceProducts: (state, action: PayloadAction<any>) => {
      state.chanceProducts = action.payload;
    },
  },
});

export const selectChance = (state: RootState) => state.chance;
export const selectChanceCustomer = (state: RootState) => state.chance.chanceCustomer;
export const selectChanceProducts = (state: RootState) => state.chance.chanceProducts;

export const { setChanceCustomer, setChanceProducts } = chanceSlice.actions;

export default chanceSlice.reducer;
