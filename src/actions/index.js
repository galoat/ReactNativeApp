
import * as serverConst from '../const/server';
import FormData from 'FormData';
import fetch from './fetchWithTimeout'
import * as  serveurFunctions from  './serveurFunctions'
import {store} from "../store/store"
import * as actions from './actions'



/*
dispatch the actionCreators
*/

export function appInitialized() {
  return async function(dispatch, getState) {
    console.log("Action: initialization App request")
    dispatch(actions.changeAppRoot('login'));
  };
}

export function loginInitialized(nb) {
  return async function(dispatch, getState) {
    console.log("Action: initialization Login request")
    dispatch(actions.initLogin(nb));
  };
}

export function newTabAddNews(jsonNews){
  return async function(dispatch, getState) {
    console.log("Action: addNews homeTab requests")
    dispatch(actions.newsAddNews(jsonNews));
  };
}

export function homeTabInit(){
  return async function(dispatch, getState) {
    console.log("Action: initialization homeTab requests")
    dispatch(actions.initHomeTab());
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
        dispatch(newTabAddNews(json));
       
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
   
     serveurFunctions.loginFromServer(username, password)
     .then(json => {
        console.log("index.js: login - serverResponse ", json)
        if(json.hasOwnProperty('error')){
          console.log("server respond an Error")
            nb_try += 1
            dispatch(actions.loginError(nb_try));
          /*if(json.error_description === "Bad credentials"){
          }*/
        } else{
          dispatch(actions.loginOK())
          dispatch(actions.changeToken(json.access_token))

        }

    })
    .catch(error => {
          console.log("index.js: login - ERROR -serverResponse ", error)
          nb_try += 1
          dispatch(actions.loginError(nb_try))
    });
  }
}

export function afterAnimationSucess(){
  store.dispatch(actions.changeAppRoot('after-login'));
}
export function returnLogin(){
  store.dispatch(actions.changeAppRoot('login'));
}
export function returnAllFeed(){
  store.dispatch(actions.changeAppRoot('after-login'));
}

export function goNews(id){
  store.dispatch(actions.newsFocused(id))
  store.dispatch(actions.changeAppRoot('moreAboutNews'));
}

export function inputChangeUser(name){
  store.dispatch(actions.loginInputUserName(name));
}

export function inputChangePassowrd(password){
  store.dispatch(actions.loginInputPassword(password));
}
