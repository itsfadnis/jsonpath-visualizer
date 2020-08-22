import { combineReducers } from '@reduxjs/toolkit';
import jsonSlice from './jsonSlice';

const rootReducer = combineReducers({
  json: jsonSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
