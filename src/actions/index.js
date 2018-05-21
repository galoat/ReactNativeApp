import * as types from './Actionstypes';
import FormData from 'FormData';

/*
Action Creators
*/

export function changeAppRoot(root) {
  return {
    type: types.ROOT_CHANGED,
    root: root
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

export function changeToken(token) {
  return {
    type: types.CHANGETOKEN,
    token: token
  }
}

export function initLogin(nb) {
  return {
    type: types.InitLogin,
    login_try: nb
  };
}
/*
dispatch the actionCreators
*/

export function appInitialized() {
  return async function(dispatch, getState) {
    console.log("Action: initialization App request")
    dispatch(changeAppRoot('login'));
  };
}

export function loginInitialized(nb) {
  return async function(dispatch, getState) {
    console.log("Action: initialization Login request")
    dispatch(initLogin(nb));
  };
}


export function login(nb_try) {
  return async function(dispatch, getState) {
    // login logic would go here, and when it's done, we switch app roots
   // 
    
    var formData = new FormData();
    formData.append('password', 'spring');
    formData.append('grant_type', 'password');
    formData.append('username', 'jlongx');

    fetch('http://51.15.235.44:9191/uaa/oauth/token', {  
     method: 'POST',
     headers: {
        'Authorization': 'Basic aHRtbDU6c2VjcmV0',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
     })
     .then(function(response) { return response.json(); })
     .then(function(json) {
        console.log("index.js: login - serverResponse ", json)
        if(json.hasOwnProperty('error')){
            nb_try += 1
            dispatch(loginError(nb_try));
          /*if(json.error_description === "Bad credentials"){
          }*/
        }
        else{
          dispatch(changeToken(json.access_token))
          dispatch(changeAppRoot('after-login'));
        }
     
    });    
  }
}
