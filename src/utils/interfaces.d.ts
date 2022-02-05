/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAction<T> {
  type: string;
  data: T;
}

export type ReducersType<T> = (state: T, action: IAction<T>) => T | void;
export type InitialType<T> = T;

export interface IStoreArgs<T> {
  initialState: InitialType<T>;
  reducer: ReducersType<T>;
}

export interface IUser {
  firstname: string;
  surName: string;
}

export type Store = {
  getState: () => any;
  getReducer: () => any;
  dispatch: <T>(action: IAction<T>) => void;
};
