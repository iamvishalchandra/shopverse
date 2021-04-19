import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import MetaData from "../../reUseable/MetaData";
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
      <h1 className="updatePassword__title">Update Password</h1>
      <div className="updatePassword__container">
        <form
          onSubmit={submitHandler}
          className="updatePassword__container__form"
        >
          <FormOptions
            formItem="input"
            id="old_password_field"
            text="Old Password"
            type="password"
            values={oldPassword}
            setValues={(e) => setOldPassword(e.target.value)}
          />

          <FormOptions
            formItem="input"
            id="new_password_field"
            text="New Password"
            type="password"
            values={newPassword}
            setValues={(e) => setNewPassword(e.target.value)}
          />

          <FormOptions
            formItem="button"
            type="submit"
            disabled={loading}
            text="Update Password"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
