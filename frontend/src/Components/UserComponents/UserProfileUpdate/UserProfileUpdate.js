import React, { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import UploadIcon from "../../../Photos/UploadIcon.svg";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import MetaData from "../../reUseable/MetaData";
import "./UserProfileUpdate.style.css";

const UserProfileUpdate = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(UploadIcon);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user.name);
      setEmail(user.email);

      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Updated Successfully");
      dispatch(loadUser());
      history.push("/me");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, alert, isUpdated, error, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="userProfileUpdate">
      <MetaData title="Update Profile" />
      <h1 className="userProfileUpdate__title">Update Profile</h1>
      <div className="userProfileUpdate__container">
        <form
          className="userProfileUpdate__container__form"
          action=""
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <FormOptions
            formItem="input"
            type="text"
            text="Name"
            id="name_field"
            values={name}
            setValues={(e) => setName(e.target.value)}
          />

          <FormOptions
            formItem="input"
            text="E-mail"
            type="email"
            id="email_field"
            values={email}
            setValues={(e) => setEmail(e.target.value)}
          />

          <div className="userProfileUpdate__container__form__avatar">
            <div className="userProfileUpdate__container__form__avatar__profile">
              <img
                className="userProfileUpdate__container__form__avatar__profile__image"
                src={avatarPreview}
                alt="Avatar Preview"
              />
            </div>
            <FormOptions
              formItem="input"
              type="file"
              name="avatar"
              id="customFile"
              text="Change Avatar"
              accept="image/*"
              setValues={onChange}
            />
          </div>
          {/* <div>
            <label htmlFor="avatar_upload">Avatar</label>
            <div>
              image div
              <div>
                <input
                  type="file"
                  name="avatar"
                  id="customFile"
                  accept="image/*"
                  onChange={onChange}
                />
                <label htmlFor="customFile">Change Avatar</label>
              </div>
            </div>
          </div> */}
          <FormOptions
            formItem="button"
            type="submit"
            text="Update"
            disabled={loading ? true : false}
            styleItem={{
              backgroundColor: loading ? "rgba(128, 128, 128, 0.315)" : "",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
