import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import MetaData from "../MetaData";
import "./NewPassword.style.css";

const NewPassword = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      console.log(success);
      alert.success("Password updated Successfully");
      history.push("/login");
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <div className="newPassword">
      <MetaData title="Reser Password" />
      <div>
        <form onSubmit={submitHandler}>
          <h1>New Password</h1>
          <div>
            <label htmlFor="password_field">New Password</label>
            <input
              type="password"
              id="password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
