import axios from "axios";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
} from "../constants/userConstants";

//User Login Section
export const userlogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "api/v1/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//User Sign UP Section
export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("api/v1/register", userData, config);

    dispatch({ type: SIGNUP_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: SIGNUP_USER_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });
