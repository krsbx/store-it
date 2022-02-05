/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { IAction, IStoreArgs, Store } from './interfaces';

// Will populate store with all of the reducer initial state
let store: any = {};
let reducers: any = {};

const getState = (): typeof store => store;
const getReducer = (): typeof reducers => reducers;

const dispatch = <T>(action: IAction<T>): void => {
  // Split to get the path to the reducer
  let path: string[] | string = _.split(action.type, '.');
  path.pop();
  path = path.join('.');

  const toUpdate = _.get(store, path);

  if (toUpdate) {
    const result = reducers[path](toUpdate, action);

    store = _.set(store, path, result);
  }
};

const exporter: Store = {
  getState: getState,
  getReducer: getReducer,
  dispatch: dispatch,
};

export const createStore = (...args: IStoreArgs<any>[]) => {
  reducers = _.keyBy(
    _.map(args, (arg) => arg.reducer),
    (reducer) => reducer.name
  );

  const initialState = _.map(args, (arg) =>
    _.set({}, arg.reducer.name, arg.initialState)
  );

  store = _.merge({}, ...initialState);

  return exporter;
};

export default createStore;
