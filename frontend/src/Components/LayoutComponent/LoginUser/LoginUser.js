import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, userlogin } from "../../../actions/userActions";
import MetaData from "../../reUseable/MetaData";
import Loader from "../../reUseable/Loader/Loader";
import FormOptions from "../../reUseable/FormOptions/FormOptions";

import "./LoginUser.style.css";

const LoginUser = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) history.push(redirect);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(userlogin(email, password));
  };

  function verify(value, name, e) {
    if (value === "") {
      e.preventDefault();
      return alert.error(`${name} input can't be empty`);
    }
  }

  const submitVerification = (e) => {
    verify(email, "Email", e);
    verify(password, "Password", e);
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
            <FormOptions
              formItem="input"
              type="email"
              id="email_field"
              text="Email"
              name="email"
              values={email}
              setValues={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Name"
            />

            <FormOptions
              formItem="input"
              type="password"
              id="password_field"
              text="Password"
              name="email"
              values={password}
              setValues={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />

            <div className="loginUser__container__form__accountHolder">
              <FormOptions
                formItem="button"
                text="Login"
                type="submit"
                setValues={submitVerification}
              />

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
