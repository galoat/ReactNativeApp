import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';
import * as constLogin from '../const/server';

const initialState = Immutable({

});


export function newMoreInfoReducer(state = initialState, action = {}) {

  switch (action.type) {

      case  types.INIT_NEW_MORE_INFO :
          console.log("newMoreInfoReducer: action type INIT newsMoreInfo")
          return state.merge({
             newsisLoading : true
           });
     case  types.NEW_FOCUSED :
          console.log("newMoreInfoReducer: action type newFocused ",action.newFocusedId)
          return state.merge({
             newsFocusedId : action.newFocusedId
           });      
  case  types.NEWS_MORE_INFO_ADD_NEWS :
          console.log("newMoreInfoReducer: action type add news")
          return state.merge({
              newsisLoading : false,
              news : action.jsonNews
           });
    default:
      return state;
  }
}
