/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import StoreIt from '../src/utils/classBase';
import { IAction, IUser, ReducersType } from '../src/utils/interfaces';

describe('store-it (class)', () => {
  let Store: StoreIt;
  let userReducer: ReducersType<IUser>;
  let userInitialState: IUser;

  const DEFAULT_VALUE = {
    firstname: '',
    surName: '',
  };

  beforeEach(() => {
    Store = new StoreIt();

    userInitialState = _.cloneDeep(DEFAULT_VALUE);

    userReducer = (state: IUser, action: IAction<IUser>) => {
      switch (action.type) {
        case 'userReducer.set':
          return { ...action.data };
        case 'userReducer.update':
          return {
            ...state,
            ...action.data,
          };
        case 'userReducer.delete':
          return DEFAULT_VALUE;
        default:
          return state;
      }
    };

    userInitialState = {
      firstname: '',
      surName: '',
    };
  });

  it('It can accept empty reducer', () => {
    const userReducer = (state: IUser, action: IAction<IUser>) => {};

    const store = Store.createStore({
      initialState: userInitialState,
      reducer: userReducer,
    });

    expect(store.getReducer()).toEqual({ userReducer });
  });

  it('It can create a reducer', () => {
    // Create a simple reducer
    const store = Store.createStore({
      initialState: userInitialState,
      reducer: userReducer,
    });

    expect(store.getReducer()).toEqual({ userReducer });
  });

  it('It can run an action', () => {
    userInitialState = {
      firstname: 'John',
      surName: 'Doe',
    };

    const store = Store.createStore({
      initialState: {},
      reducer: userReducer,
    });

    store.dispatch<Partial<IUser>>({
      type: 'userReducer.set',
      data: {
        firstname: 'John',
        surName: 'Doe',
      },
    });

    expect(store.getState()['userReducer']).toEqual({
      firstname: 'John',
      surName: 'Doe',
    });
  });
});
