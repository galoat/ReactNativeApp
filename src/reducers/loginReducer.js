import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';
import * as constLogin from '../const/server';

const initialState = Immutable({
  nb: 0 // 'login' / 'after-login'

});

export function loginReducer(state = initialState, action = {}) {

  switch (action.type) {

      case  types.INIT_LOGIN  :
          console.log("LoginReducer: action type INIT Login")
          return state.merge({
               login_try: action.login_try,
               login_sucess: false,
               userName : constLogin.DEFAULT_USER_NAME
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
    case types.ROOT_CHANGED:
        if(action.root !== "login"){
          return state.merge({
               login_sucess: false,
               login_try: 0
           });
        }

    case  types.USER_INPUT  :
          console.log("LoginReducer: action type USER_INPUT Login")
          return state.merge({
                userName :action.userInput
          });
    default:
      return state;
  }
}
