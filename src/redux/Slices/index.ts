import { combineReducers } from 'redux';
import { AnyAction, Reducer } from '@reduxjs/toolkit';

import toastReducer from './toast';
import appReducer from './app';
import authReducer from './auth';
import layoutReducer from './layout';
import tierReducer from './tier';
import selectReducer from './select';
import orderReducer from './order';
import chanceReducer from './chance';

export * from './toast';
export * from './app';
export * from './auth';
export * from './layout';
export * from './tier';
export * from './select';
export * from './order';
export * from './chance';

const productReducer = combineReducers({
  toast: toastReducer,
  app: appReducer,
  auth: authReducer,
  layout: layoutReducer,
  tier: tierReducer,
  select: selectReducer,
  order: orderReducer,
  chance: chanceReducer,
});

export type RootState = ReturnType<typeof productReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    // reset state
    state = {} as RootState;
    // reset local storage
    localStorage.clear();
  }
  return productReducer(state, action);
};
export default rootReducer;
