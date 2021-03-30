import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../MetaData";
import "./UpdatePassword.style.css";

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Passsword Changed Successfully");
      dispatch(loadUser());
      history.push("/me");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, alert, error, isUpdated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);
    dispatch(updatePassword(formData));
  };

  return (
    <div className="updatePassword">
      <MetaData title="Change Password" />
      <div>
        <form onSubmit={submitHandler}>
          <h1>Update Password</h1>
          <div>
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading ? true : false}
            style={{
              backgroundColor: loading ? "rgba(128, 128, 128, 0.315)" : "",
            }}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
