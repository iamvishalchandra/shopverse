import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducers,
  productDetailsReducer,
} from "./reducers/productReducers";
import { userReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  user: userReducer,
});

let initialState = [];

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
