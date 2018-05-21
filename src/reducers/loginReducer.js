import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  nb: 0 // 'login' / 'after-login'

});

export function loginReducer(state = initialState, action = {}) {

  switch (action.type) {
    case types.INCREMENT:
      console.log("LoginReducer: action type increment", action.nb )
      return state.merge({
        nb: action.nb + 1
      });
      case  types.INIT_LOGIN:
          console.log("LoginReducer: action type INITNB")
          return state.merge({
               login_try: action.login_try
           });
      case types.CHANGETOKEN:
        console.log("LoginReducer: action type ChangeToken")
         return state.merge({
               token: action.token
           });
      case types.LOGIN_ERROR:
         console.log("LoginReducer: action type Login Error ( try : ", action.login_try,' )')
          return state.merge({
               login_try: action.login_try
           });
    default:
      return state;
  }
}
