import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';

const initialStateRoot = Immutable({
  root: undefined // 'login' / 'after-login'

});

//root reducer
export function rootReducer(state = initialStateRoot, action = {}) {
  console.log("root reducer")
  switch (action.type) {

    case types.ROOT_CHANGED:
    console.log("root changed")
      return state.merge({
        root: action.root
      });

    default:
      return state;
  }
}
