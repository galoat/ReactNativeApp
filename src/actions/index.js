import * as types from './Actionstypes';

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
    dispatch(changeAppRoot('after-login'));
  };
}


export function increment() {
  return async function(dispatch, getState) {
    // login logic would go here, and when it's done, we switch app roots
  /*  console.log("Action: increment action", getState().loginReducer)
    function fetchData(){
    const url = 'http://localhost:9999/personnes/login?name="fref"&password=d"éeé"e'
    fetch(url)
    .then (response ) => {console.log(response)}
    .catch( error) => {console.log("error")}
}*/
    dispatch(incrementNb(getState().loginReducer.nb));
  };
}
