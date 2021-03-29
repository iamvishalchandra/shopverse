import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, signUp } from "../../actions/userActions";
import LoggingOptions from "../LoggingOptions/LoggingOptions";
import MetaData from "../MetaData";
import UploadIcon from "../Photos/UploadIcon.svg";
import "./Register.style.css";

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
  console.log(loading);

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

  const submitVerification = () => {
    if (name === "" || email === "" || password === "" || avatar === "")
      return alert.error("Box Empty");
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
          <LoggingOptions
            type="name"
            id="name_field"
            text="Name"
            values={name}
            setValues={onChange}
            register
          />

          {/* <div>
            <label htmlFor="name-field">Name</label>
            <input
              type="name"
              id="name_field"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div> */}
          <LoggingOptions
            type="email"
            id="email_field"
            text="Email"
            values={email}
            setValues={onChange}
            register
          />
          {/* <div>
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div> */}

          <LoggingOptions
            type="password"
            id="password_field"
            text="Password"
            values={password}
            setValues={onChange}
            register
          />
          {/* <div>
            <label htmlFor="password_field">password</label>
            <input
              type="password"
              id="password_field"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div> */}

          <div className="register__container__form__avatar">
            <label
              htmlFor="avatar-upload"
              className="register__container__form__avatar__label"
            >
              Avatar
            </label>

            <div className="register__container__form__avatar__body">
              {/* <figure> */}
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  // style={{ width: "20px" }}
                  className="register__container__form__avatar__body__photo"
                />
              )}
              {/* </figure> */}

              {/* <LoggingOptions
              type="file"
              id="customFile"
              text="Choose Avatar"
              name="avatar"
              accept="/images/*"
              // values={password}
              setValues={onChange}
              register
            /> */}
              <div className="register__container__form__avatar__body__upload">
                <label
                  htmlFor="customFile"
                  className="register__container__form__avatar__body__upload__label"
                >
                  Choose Avatar
                </label>
                <input
                  type="file"
                  id="customFile"
                  name="avatar"
                  accept="/images/*"
                  onChange={onChange}
                  className="register__container__form__avatar__body__upload__input"
                />
              </div>
            </div>
          </div>
          <button
            id="register_button"
            type="submit"
            disabled={loading ? true : false}
            style={{ visibility: loading ? "hidden" : "inherit" }}
            className="register__container__button register__container__form__register"
            onClick={submitVerification}
          >
            Create Account
          </button>
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
