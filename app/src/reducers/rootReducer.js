import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';

const initialStateRoot = Immutable({
  root: undefined // 'login' / 'after-login'

});

//root reducer
export function rootReducer(state = initialStateRoot, action = {}) {

  switch (action.type) {

    case types.ROOT_CHANGED:
    console.log("Root Reducer : Root has changed")
      return state.merge({
        root: action.root
      });

    default:
      return state;
  }
}
