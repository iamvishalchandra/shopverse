import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, userlogin } from "../../actions/userActions";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";

import "./LoginUser.style.css";
import LoggingOptions from "../LoggingOptions/LoggingOptions";

const LoginUser = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) history.push("/");

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(userlogin(email, password));
  };

  return (
    <div className="loginUser">
      <h1 className="loginUser__title">Login</h1>
      <MetaData title={`Login`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="loginUser__container">
          <form className="loginUser__container__form" onSubmit={submitHandle}>
            <LoggingOptions
              type="email"
              id="email_field"
              text="Email"
              values={email}
              setValues={setEmail}
            />
            {/* <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}

            <LoggingOptions
              type="password"
              id="password_field"
              text="Password"
              values={password}
              setValues={setPassword}
            />
            {/* <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
            <div className="loginUser__container__form__accountHolder">
              <button
                type="submit"
                className="loginUser__container__form__button loginUser__container__form__accountHolder__login"
              >
                Login
              </button>
              <Link
                to="/password/forgot"
                className="loginUser__container__form__button loginUser__container__form__accountHolder__forgot"
              >
                Forgot Password?
              </Link>
            </div>
            <Link
              to="/signup"
              className="loginUser__container__form__button loginUser__container__form__signup"
            >
              Create New Account
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
