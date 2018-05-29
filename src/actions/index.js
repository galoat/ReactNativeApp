import * as types from './Actionstypes';
import FormData from 'FormData';
import fetch from './fetchWithTimeout'
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

export function loginSucess() {
  console.log("inuinuinuin")
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

    fetch('http://51.15.235.44:9191/uaa/oauth/token', {
     method: 'POST',
     headers: {
        'Authorization': 'Basic aHRtbDU6c2VjcmV0',
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
          dispatch(changeToken(json.access_token))
          dispatch(loginSucess())
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
    dispatch(changeAppRoot('after-login'));
}
