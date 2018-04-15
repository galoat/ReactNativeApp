import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  nb: 0 // 'login' / 'after-login'

});

export function loginReducer(state = initialState, action = {}) {

  switch (action.type) {
    case types.INCREMENT:
      console.log("LoginReducer :action type increment", action.nb )
      return state.merge({
        nb: action.nb + 1
      });

    default:
      console.log("LoginReducer: Default")
      return state;
  }
}
