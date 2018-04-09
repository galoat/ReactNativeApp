import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  nb: 0 // 'login' / 'after-login'

});

export function loginReducer(state = initialState, action = {}) {
console.log("login reducer" )
  switch (action.type) {

    case types.INCREMENT:
      console.log("action type increment" )
      return state.merge({
        nb: action.nb + 1
      });

    default:
      return state;
  }
}
