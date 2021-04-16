import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsersActions, clearErrors } from "../../../actions/userActions";
import Loader from "../../Loader/Loader";
import MetaData from "../../MetaData";
import Pagination from "../../reUseable/Pagination/Pagination";
import Sidebar from "../Sidebar/Sidebar";
import "./UsersListAdmin.style.css";

const UsersListAdmin = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(allUsersActions());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  //   console.log(users);
  const setUsers = () => {
    const data = {
      columns: [
        { label: "User Id", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };

    users?.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link>Users</Link>
            <button>Delete</button>
          </>
        ),
      });
    });
  };

  return (
    <div className="usersListAdmin">
      <MetaData title="All Users" />
      {/* <Sidebar /> */}
      <div>
        <h1>UsersListAdmin</h1>
        <div>
          {loading ? (
            <Loader />
          ) : (
            users.map((user) => (
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "200px" }}>{user._id}</div>
                <div style={{ width: "200px" }}>{user.name}</div>
                <div style={{ width: "200px" }}>{user.email}</div>
                <div style={{ width: "200px" }}>{user.role}</div>
                <Link>Edit</Link>
                <button>Delete</button>
              </div>
            ))
          )}
          <Pagination dataItem={users} />
        </div>
      </div>
    </div>
  );
};

export default UsersListAdmin;
