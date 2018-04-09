import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux"

import thunk from "redux-thunk";
import registerScreens from '../components/screens.js';
import {loginReducer} from "../reducers/loginReducer";
import {rootReducer} from "../reducers/rootReducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware(combineReducers({
  rootReducer,
  loginReducer

}));
registerScreens(store, Provider);
