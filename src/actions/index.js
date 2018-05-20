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

export function initNb(nb) {
  return {
    type: types.INITNB,
    nb: nb
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
    dispatch(initNb(nb));
  };
}


export function login() {
  return async function(dispatch, getState) {
    // login logic would go here, and when it's done, we switch app roots
   // dispatch(changeAppRoot('after-login'));
    
    var formData = new FormData();
    formData.append('password', 'spring');
    formData.append('grant_type', 'password');
    formData.append('username', 'jlong');

    fetch('http://51.15.235.44:9191/uaa/oauth/token', {  
     method: 'POST',
      headers: {
        'Authorization': 'Basic aHRtbDU6c2VjcmV0',
        'Content-Type': 'multipart/form-data',
      },body: formData
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
     console.log(json)
    });    
  }
}
