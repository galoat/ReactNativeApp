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
/*
dispatch the actionCreators
*/

export function appInitialized() {
  return async function(dispatch, getState) {
    console.log("initialization App request")
    dispatch(changeAppRoot('login'));
    dispatch(incrementNb(0));
  };
}
export function loginInitialized() {
  return async function(dispatch, getState) {
    console.log("initialization Login request")
    dispatch(incrementNb(0));
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
    console.log("dispatch increment action", getState().loginReducer)
    dispatch(incrementNb(getState().loginReducer.nb));
  };
}
