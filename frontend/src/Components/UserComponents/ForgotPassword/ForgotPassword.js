import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../actions/userActions";
import MetaData from "../../reUseable/MetaData";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
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
    dispatch(forgotPassword(formData));
  };

  return (
    <div>
      <MetaData title="Forgot Password" />
      <div className="forgotPassword">
        <h1 className="forgotPassword__title">Forgot Password?</h1>
        <form onSubmit={submitHandler} className="forgotPassword__form">
          <FormOptions
            formItem="input"
            type="email"
            id="email_field"
            values={email}
            name="email"
            text="E-mail"
            placeholder="Enter your email"
            setValues={(e) => setEmail(e.target.value)}
          />

          <FormOptions
            formItem="button"
            text="Send Email"
            type="submit"
            disabled={loading ? true : false}
            styleItem={{
              backgroundColor: loading && "rgba(128, 128, 128, 0.315)",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
