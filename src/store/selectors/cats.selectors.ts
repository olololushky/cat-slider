import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const catsSelector = (state: RootState) => state.cats;

export const selectCats = createSelector(catsSelector, (state) => state?.cats);
export const selectCatsPage = createSelector(
  catsSelector,
  (state) => state?.page
);
export const selectCatsLoading = createSelector(
  catsSelector,
  (state) => state?.isLoading
);
export const selectCatsLoaded = createSelector(
  catsSelector,
  (state) => state?.loaded
);
