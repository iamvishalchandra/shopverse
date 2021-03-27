import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signUp } from "../../actions/userActions";
import MetaData from "../MetaData";
import "./Register.style.css";

const Register = ({ history }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/photo/logo.png");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) history.push("/");

    if (error) {
      alert.error(error);
      console.log(error);
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

  return (
    <div className="register">
      <MetaData title={`Register Account`} />
      <div>
        <h1>Registeration</h1>
        <form onSubmit={submitHandle} encType="multipart/form-data">
          <div>
            <label htmlFor="name-field">Name</label>
            <input
              type="name"
              id="name_field"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password_field">password</label>
            <input
              type="password"
              id="password_field"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="avatar-upload">Avatar</label>
            <div>
              <div>
                {/* <figure> */}
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    style={{ width: "100px" }}
                  />
                )}
                {/* </figure> */}
              </div>
            </div>
            <div>
              <input
                type="file"
                id="customFile"
                name="avatar"
                accept="/images/*"
                onChange={onChange}
              />
              {/* <label htmlFor="customFile">Choose Avatar</label> */}
            </div>
          </div>
          <button
            id="register_button"
            type="submit"
            disabled={loading ? true : false}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
