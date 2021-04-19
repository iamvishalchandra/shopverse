import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allUsersActions,
  clearErrors,
  deleteUserAction,
} from "../../../actions/userActions";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import PaginationComponent from "../../reUseable/PaginationComponent/PaginationComponent";

import Sidebar from "../Sidebar/Sidebar";
import "./UsersListAdmin.style.css";

const UsersListAdmin = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isUserDeleted } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(allUsersActions());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUserDeleted) {
      alert.success("User Deleted Successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUserDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUserAction(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        { title: "Photo", id: "photo", sort: "asc" },
        { title: "User Id", id: "id", sort: "asc" },
        { title: "Name", id: "name", sort: "asc" },
        { title: "E-mail", id: "email", sort: "asc" },
        { title: "Role", id: "role", sort: "asc" },
        { title: "Actions", id: "actions" },
      ],
      rows: [],
    };

    users?.forEach((user) => {
      data.rows.push({
        photo: user.avatar.url,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        actions: (
          <>
            <Link to={`/admin/user/${user._id}`}>
              <button className="usersListAdmin__container__body__edit usersListAdmin__container__body__button">
                <img
                  className="usersListAdmin__container__body__button__icon"
                  src="/photo/edit-3-512.png"
                  alt="edit"
                />
              </button>
            </Link>
            <button
              className="usersListAdmin__container__body__delete usersListAdmin__container__body__button"
              onClick={() => deleteUserHandler(user._id)}
            >
              <img
                className="usersListAdmin__container__body__button__icon"
                src="/photo/delete-512.png"
                alt="delete"
              />
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <div className="usersListAdmin">
      <MetaData title="All Users" />
      <Sidebar />
      <div className="usersListAdmin__container">
        <h1 className="usersListAdmin__container__title">All Members</h1>
        <div className="usersListAdmin__container__body">
          {loading ? (
            <Loader />
          ) : (
            <PaginationComponent
              dataItem={users}
              tableData={setUsers()}
              itemsPerPage={3}
              numOfPages={10}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersListAdmin;
