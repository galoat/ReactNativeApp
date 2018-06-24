import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux"

import thunk from "redux-thunk";
import registerScreens from '../components/screens.js';
import {loginReducer} from "../reducers/loginReducer";
import {rootReducer} from "../reducers/rootReducer";
import {newMoreInfoReducer} from "../reducers/newMoreInfoReducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware(combineReducers({
  rootReducer,
  loginReducer,
  newMoreInfoReducer

}));
registerScreens(store, Provider);
