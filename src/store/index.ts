import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catsSlice from "./slices/cats.slice";

const rootReducer = combineReducers({
  cats: catsSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({ reducer: rootReducer });
