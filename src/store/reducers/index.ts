/** @format */
import { combineReducers } from 'redux';
import common from './common';

export interface Action {
  type: string;
  [propName: string]: unknown;
}

export type Reducer = (state: unknown, action: Action) => unknown;

export interface Handler {
  [propName: string]: Reducer;
}

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = Object.assign(common);

export default combineReducers(rootReducer);
