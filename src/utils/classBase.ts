/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { IAction, IStoreArgs } from './interfaces';

export default class StoreIt {
  store: any;
  reducers: any;

  constructor() {
    this.store = {};
    this.reducers = {};
  }

  private getState(): typeof this.store {
    return this.store;
  }

  private getReducer(): typeof this.reducers {
    return this.reducers;
  }

  private dispatch<T>(action: IAction<T>): void {
    // Split to get the path to the reducer
    let path: string[] | string = _.split(action.type, '.');
    path.pop();
    path = path.join('.');

    const toUpdate = _.get(this.store, path);

    if (toUpdate) {
      const result = this.reducers[path](toUpdate, action);

      this.store = _.set(this.store, path, result);
    }
  }

  private get exporter(): {
    getState: () => any;
    getReducer: () => any;
    dispatch: <T>(action: IAction<T>) => void;
  } {
    return {
      getState: this.getState.bind(this),
      getReducer: this.getReducer.bind(this),
      dispatch: this.dispatch.bind(this),
    };
  }

  createStore(...args: IStoreArgs<any>[]) {
    this.reducers = _.keyBy(
      _.map(args, (arg) => arg.reducer),
      (reducer) => reducer.name
    );

    const initialState = _.map(args, (arg) =>
      _.set({}, arg.reducer.name, arg.initialState)
    );

    this.store = _.merge({}, ...initialState);

    return this.exporter;
  }
}
