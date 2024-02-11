import { ICat } from "./cat.models";

export interface ICatStore {
  cats: ICat[];
  page: number;
  isLoading: boolean;
  loaded: boolean;
}
