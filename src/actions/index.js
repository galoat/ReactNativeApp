import * as types from './Actionstypes';
import * as serverConst from '../const/server';
import FormData from 'FormData';
import fetch from './fetchWithTimeout'
import {store} from "../store/store"

/*
Action Creators
*/

export function changeAppRoot(root) {
  console.log("appRoot")
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
    formData.append('username', 'jlong');
    console.log("+++++")


    var encodeBase64 = serverConst.SERVER_BASE64

    fetch("http://"+serverConst.IP_SERVER+":"+serverConst.SERVER_PORT_OAUTH+serverConst.SERVER_OAUTH_PATH, {
     method: 'POST',
     headers: {
        'Authorization': "Basic "+ encodeBase64,
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    }, 10000 )
     .then(response => {
          return response.json();
       })
     .then(json => {
        console.log("index.js: login - serverResponse ", json)
        if(json.hasOwnProperty('error')){
          console.log("server respond an Error")
            nb_try += 1
            dispatch(loginError(nb_try));
          /*if(json.error_description === "Bad credentials"){
          }*/
        } else{
          dispatch(loginOK())
          dispatch(changeToken(json.access_token))
        }

    })
    .catch(error => {
          console.log("index.js: login - ERROR -serverResponse ", error)
          nb_try += 1
          dispatch(loginError(nb_try))
    });
  }
}

export function afterAnimationSucess(){
  store.dispatch(changeAppRoot('after-login'));
}
export function returnLogin(){
  store.dispatch(changeAppRoot('login'));
}
