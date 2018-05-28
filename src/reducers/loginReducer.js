import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  nb: 0 // 'login' / 'after-login'

});

export function loginReducer(state = initialState, action = {}) {

  switch (action.type) {

      case  types.INIT_LOGIN:
          console.log("LoginReducer: action type INITNB")
          return state.merge({
               login_try: action.login_try,
               login_sucess: false
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
      case types.LOGIN_SUCESS:
           console.log("LoginReducer: action type Login SUCESS")
            return state.merge({
                 login_sucess: true
             });
    default:
      return state;
  }
}
