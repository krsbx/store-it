/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { createStore } from '../src/utils/hookBase';
import { IAction, IUser, ReducersType, Store } from '../src/utils/interfaces';

describe('store-it (hooks)', () => {
  let store: Store;
  let userReducer: ReducersType<IUser>;
  let userInitialState: IUser;

  const DEFAULT_VALUE = {
    firstname: '',
    surName: '',
  };

  beforeEach(() => {
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

    store = createStore({
      initialState: userInitialState,
      reducer: userReducer,
    });

    expect(store.getReducer()).toEqual({ userReducer });
  });

  it('It can create a reducer', () => {
    // Create a simple reducer
    store = createStore({
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

    store = createStore({
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
