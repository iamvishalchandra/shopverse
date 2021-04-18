import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsersActions, clearErrors } from "../../../actions/userActions";
import Loader from "../../Loader/Loader";
import MetaData from "../../MetaData";
import PaginationComponent from "../../reUseable/PaginationComponent/PaginationComponent";

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

  const setUsers = () => {
    const data = {
      columns: [
        { title: "Photo", id: "photo", sort: "asc" },
        { title: "User Id", id: "id", sort: "asc" },
        { title: "Name", id: "name", sort: "asc" },
        { title: "E-mail", id: "email", sort: "asc" },
        { title: "Role", id: "role", sort: "asc" },
      ],
      rows: [],

      actions: (
        <>
          <Link>
            <button className="usersListAdmin__container__body__edit usersListAdmin__container__body__button">
              <img
                className="usersListAdmin__container__body__button__icon"
                src="/photo/edit-3-512.png"
                alt="edit"
              />
            </button>
          </Link>
          <button className="usersListAdmin__container__body__delete usersListAdmin__container__body__button">
            <img
              className="usersListAdmin__container__body__button__icon"
              src="/photo/delete-512.png"
              alt="delete"
            />
          </button>
        </>
      ),
    };

    users?.forEach((user) => {
      data.rows.push({
        photo: user.avatar.url,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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
