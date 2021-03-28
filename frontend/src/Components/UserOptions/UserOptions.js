import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/userActions";
import "./UserOptions.style.css";

const UserOptions = ({ user, userOptions, setUserOptions }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const logOutHandler = () => {
    dispatch(logOut());
    alert.success("Logged Out");
  };

  return (
    userOptions && (
      <div className="userOptions">
        {user?.role !== "admin" ? (
          <>
            <Link onClick={() => setUserOptions(!userOptions)} to="/orders/me">
              Orders
            </Link>
          </>
        ) : (
          <Link onClick={() => setUserOptions(!userOptions)} to="/dashboard">
            Dashboard
          </Link>
        )}
        <Link onClick={() => setUserOptions(!userOptions)} to="/me">
          Profile
        </Link>
        <Link
          onClick={() => setUserOptions(!userOptions)}
          to="/"
          style={{ color: "red" }}
          onClick={logOutHandler}
        >
          Logout
        </Link>
      </div>
    )
  );
};

export default UserOptions;
