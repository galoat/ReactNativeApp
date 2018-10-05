import * as types from './Actionstypes';
import * as serverConst from '../const/server';
import FormData from 'FormData';
import fetch from './fetchWithTimeout'
import * as  serveurFunctions from  './serveurFunctions'
import {store} from "../store/store"


/*
Action Creators
*/

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
export function homeTabInit(){
  return async function(dispatch, getState) {
    console.log("Action: initialization homeTab requests")
    dispatch(initHomeTab());
  };
}

export function actualizedNewsFeed(){
  console.log("Actualise news info")
   serveurFunctions.getFeedFromServer(getState().loginReducer.token)
     .then(json => {
        console.log("sereurFunction.js: getAllFeed - serverResponse ", json)
        dispatch(homeTabInit());
       
    })
    .catch(error => {
          console.log("serveurFunctions.js: getAllFeed - ERROR -serverResponse ", error)
          //TODO remove that (test)
            dispatch(homeTabInit());
   
    });
}


export  function getAllFeed(){
  return async function(dispatch, getState){
  console.log("feed : ",getState().newMoreInfoReducer.news)
  if (typeof getState().newMoreInfoReducer.news === 'undefined'){
    console.log("feed not in app load from sever" )
    ///TODO not reload if already fetch
     serveurFunctions.getFeedFromServer(getState().loginReducer.token)
     .then(json => {
        console.log("sereurFunction.js: getAllFeed - serverResponse ", json)
        ///TODO ADD or vent  request to init all information 
        dispatch(homeTabInit());
       
    })
    .catch(error => {
          console.log("serveurFunctions.js: getAllFeed - ERROR -serverResponse ", error)
          //TODO remove that (test)
            dispatch(homeTabInit());
   
    });
  }else{
     console.log("feed  in  cache" );
      dispatch(homeTabInit());
  }
  }
}



export function login(nb_try, username, password) {
  return async function(dispatch, getState) {
    console.log("Login with username ", username, " password ", password)
    // user jlong password spring
    var formData = new FormData();
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('username', username);

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
export function returnAllFeed(){
  store.dispatch(changeAppRoot('after-login'));
}

export function goNews(id){
  store.dispatch(newsFocused(id))
  store.dispatch(changeAppRoot('moreAboutNews'));
}

export function inputChangeUser(name){
  store.dispatch(loginInputUserName(name));
}

export function inputChangePassowrd(password){
  store.dispatch(loginInputPassword(password));
}
