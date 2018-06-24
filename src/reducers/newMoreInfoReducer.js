import * as types from '../actions/Actionstypes';
import Immutable from 'seamless-immutable';
import * as constLogin from '../const/server';

const initialState = Immutable({

});

const htmlContent = `<p>Bonjour Comm<strong>&nbsp;</strong></p>
<p><strong>Tett</strong></p>
<p style="text-align: center;"><em><strong>OtherTest</strong></em></p>
<p><strong>&nbsp;</strong></p>`;

export function newMoreInfoReducer(state = initialState, action = {}) {

  switch (action.type) {

      case  types.INIT_NEW_MORE_INFO :
          console.log("newMoreInfoReducer: action type INIT newsMoreInfo")
          return state.merge({
             news : htmlContent
           });

    default:
      return state;
  }
}
