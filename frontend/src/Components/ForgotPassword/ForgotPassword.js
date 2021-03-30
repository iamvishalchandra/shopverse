import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userActions";
import { forgotPasswordReducer } from "../../reducers/userReducers";
import MetaData from "../MetaData";
import "./ForgotPassword.style.css";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) alert.success(message);
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPasswordReducer(formData));
  };

  return (
    <div>
      <MetaData title="Forgot Password" />
      <div>
        <form onSubmit={submitHandler}>
          <h1>Forgot Password</h1>
          <div>
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading ? true : false}
            style={{
              backgroundColor: loading ? "rgba(128, 128, 128, 0.315)" : "",
            }}
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
