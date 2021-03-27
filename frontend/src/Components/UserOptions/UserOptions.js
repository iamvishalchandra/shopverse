import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/userActions";
import "./UserOptions.style.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const logOutHandler = () => {
    dispatch(logOut());
    alert.success("Logged Out");
  };
  return (
    <div className="userOptions">
      {user?.role !== "admin" ? (
        <>
          <Link to="/orders/me">Orders</Link>
        </>
      ) : (
        <Link to="/dashboard">UserLogout</Link>
      )}
      <Link to="/me">Profile</Link>
      <Link to="/" style={{ color: "red" }} onClick={logOutHandler}>
        Logout
      </Link>
    </div>
  );
};

export default UserOptions;
