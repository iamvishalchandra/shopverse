import axios from "axios";
import { CREATE_ORDER_REQUEST } from "../constants/orderConstants";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
} from "../constants/productConstants";

export const getProducts = (
  currentPage = 1,
  keyword = "",
  priceRange,
  category,
  rating
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${priceRange[1]}&price[gte]=${priceRange[0]}&rating[gte]=${rating}`;
    if (keyword === "")
      url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}`;

    if (category)
      url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${priceRange[1]}&price[gte]=${priceRange[0]}&category=${category}&rating[gte]=${rating}`;

    const { data } = await axios.get(url);

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put("/api/v1/review", reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });
