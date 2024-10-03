import {combineReducers, applyMiddleware} from "redux";
import {legacy_createStore as createStore} from "redux";
import {thunk} from "redux-thunk";
import userReducer from "./userReducer";
import {composeWithDevTools} from "@redux-devtools/extension";

const reducer = combineReducers({
    userReducer: userReducer,
});

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);