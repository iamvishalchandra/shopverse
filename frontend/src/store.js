import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducers,
  productDetailsReducer,
  newReviewReducer,
  createProductReducer,
  deleteProductReducer,
  updateProductReducer,
} from "./reducers/productReducers";
import {
  allUsersReducer,
  forgotPasswordReducer,
  userProfileReducer,
  userReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  updateOrderReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  createProduct: createProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  updateOrder: updateOrderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
