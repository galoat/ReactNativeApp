import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux"

import thunk from "redux-thunk";
import registerScreens from '../components/screens.js';
import * as reducers from "../reducers/index";
const reducer = combineReducers(reducers);

registerScreens(store, Provider);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export store = createStoreWithMiddleware(reducer);
