
/*
Action Creators
*/
import * as types from './Actionstypes';

export function changeAppRoot(root) {
  return {
    type: types.ROOT_CHANGED,
    root: root
  };
}

export function newsFocused(id) {
  return {
    type: types.NEW_FOCUSED,
    newFocusedId: id
  };
}

export function newsAddNews(jsonNews) {
  return {
    type: types.NEWS_MORE_INFO_ADD_NEWS,
    jsonNews: jsonNews
  };
}



export function incrementNb(nb) {
  return {
    type: types.INCREMENT,
    nb: nb
  };
}

export function loginError(login_try) {
  return {
    type: types.LOGIN_ERROR,
    login_try: login_try
  };
}

export function loginOK() {
  return {
    type: types.LOGIN_SUCESS
  };
}

export function changeToken(token) {
  return {
    type: types.CHANGETOKEN,
    token: token
  }
}

export function initLogin(nb) {
  return {
    type: types.INIT_LOGIN,
    login_try: nb
  };
}

export function initHomeTab() {
  return {
    type: types.INIT_NEW_MORE_INFO,
  };
}



export function loginInputUserName(name) {
  return {
    type: types.USER_INPUT,
    userInput: name
  };
}

export function loginInputPassword(passwd) {
  return {
    type: types.USER_PASSWORD,
    password: passwd
  };
}