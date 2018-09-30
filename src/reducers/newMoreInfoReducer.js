import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';
import * as constLogin from '../const/server';

const initialState = Immutable({

});

const htmlContent = JSON.parse(`[{"feed":"test0"},{"feed":"test1"},{"feed":"test2"}]`);

export function newMoreInfoReducer(state = initialState, action = {}) {

  switch (action.type) {

      case  types.INIT_NEW_MORE_INFO :
          console.log("newMoreInfoReducer: action type INIT newsMoreInfo")
          return state.merge({
             news : htmlContent
           });
     case  types.NEW_FOCUSED :
          console.log("newMoreInfoReducer: action type newFocused ",action.newFocusedId)
          return state.merge({
             newsFocusedId : action.newFocusedId
           });      
    default:
      return state;
  }
}
