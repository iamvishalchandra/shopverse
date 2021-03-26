import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, userlogin } from "../../actions/userActions";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";

import "./LoginUser.style.css";

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
      <MetaData title={`Login`} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <form className="loginUser__form" onSubmit={submitHandle}>
              <h1>Login</h1>
              <div>
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password?</Link>

              <button type="submit">LOGIN</button>
              <Link to="/signup">SIGN UP</Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
