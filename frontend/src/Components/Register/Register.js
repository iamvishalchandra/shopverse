import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, signUp } from "../../actions/userActions";

import MetaData from "../MetaData";
import UploadIcon from "../../Photos/UploadIcon.svg";
import "./Register.style.css";
import FormOptions from "../reUseable/FormOptions/FormOptions";

const Register = ({ history }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(UploadIcon);

  const alert = useAlert();
  const dispatch = useDispatch();

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

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(signUp(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  function verify(value, name, e) {
    if (value === "") {
      e.preventDefault();
      return alert.error(`${name} input can't be empty`);
    }
  }

  const submitVerification = (e) => {
    verify(name, "Name", e);
    verify(email, "Email", e);
    verify(password, "Password", e);
    verify(avatar, "Avatar", e);
  };

  return (
    <div className="register">
      <MetaData title={`Register Account`} />
      <h1 className="register__title">Registeration</h1>
      <div className="register__container">
        <form
          onSubmit={submitHandle}
          encType="multipart/form-data"
          className="register__container__form"
        >
          <FormOptions
            formItem="input"
            type="name"
            id="name_field"
            text="Name"
            name="name"
            values={name}
            setValues={onChange}
          />

          <FormOptions
            formItem="input"
            type="email"
            id="email_field"
            name="email"
            text="Email"
            values={email}
            setValues={onChange}
          />

          <FormOptions
            formItem="input"
            type="password"
            name="password"
            id="password_field"
            text="Password"
            values={password}
            setValues={onChange}
          />

          <div className="register__container__form__avatar">
            <div className="register__container__form__avatar__body">
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="register__container__form__avatar__body__photo"
                />
              )}
              <FormOptions
                formItem="input"
                type="file"
                id="customFile"
                name="avatar"
                text="Choose Avatar"
                accept="/image/*"
                setValues={onChange}
                styleItem={{ marginTop: "0" }}
              />
            </div>
          </div>
          <FormOptions
            formItem="button"
            type="submit"
            text="Creat Account"
            disabled={loading ? true : false}
            setValues={submitVerification}
          />
        </form>
        <div className="register__container__logIn">
          Already Have Account?
          <Link
            className="register__container__button register__container__logIn__redirect"
            to="/login"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
