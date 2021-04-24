import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateUserAction,
  userDetailsAction,
} from "../../../actions/userActions";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import Sidebar from "../Sidebar/Sidebar";
import "./UpdateUser.style.css";

const UpdateUser = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isUpdated, error, loading } = useSelector(
    (state) => state?.userProfile
  );
  const { user } = useSelector((state) => state?.userDetails);

  const userId = match.params.id;

  useEffect(() => {
    dispatch(userDetailsAction(userId));
    if (user?._id !== userId) {
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, isUpdated, history, user, userId]);

  const submitHandle = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);
    dispatch(updateUserAction(user._id, formData));
  };

  return (
    <div className="updateUser">
      <MetaData title={`Update ${user?.name}`} />
      <Sidebar />
      <div className="updateUser__container">
        <h1>Update User</h1>

        <div>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={submitHandle}>
              <FormOptions
                formItem="input"
                type="text"
                name="name"
                text="Name"
                values={name}
                setValues={(e) => setName(e.target.value)}
                id="name_field"
              />
              <FormOptions
                formItem="input"
                type="email"
                name="email"
                text="E-mail"
                values={email}
                setValues={(e) => setEmail(e.target.value)}
                id="email_field"
              />
              <FormOptions
                formItem="dropdown"
                id="role_field"
                values={role}
                setValues={(e) => setRole(e.target.value)}
                name="role"
                text="Role"
                dropdownList={["user", "admin"]}
              />

              <FormOptions
                formItem="button"
                type="submit"
                text={`Update ${user?.name}`}
                disabled={loading ? true : false}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
