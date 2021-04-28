import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.style.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <div className="sidebar" style={{ width: show ? "350px" : "25px" }}>
      <div
        onClick={() => setShow(!show)}
        className={
          show ? `sidebar__toggle sidebar__toggle__active` : `sidebar__toggle`
        }
      >
        {show ? (
          <img
            className="sidebar__toggle__icons sidebar__toggle__icons--close"
            src="/photo/menu/menuClose.png"
            alt="menu"
          />
        ) : (
          <img
            className="sidebar__toggle__icons sidebar__toggle__icons--open"
            src="/photo/menu/menuIcon.png"
            alt="menu"
          />
        )}
      </div>
      <div className="sidebar__container" style={{ width: show && "300px" }}>
        <div className="sidebar__container__menu">
          <ul className="sidebar__container__menu__options">
            <li
              className={`sidebar__container__menu__options__list sidebar__container__menu__options__list__active`}
            >
              <Link
                to="/dashboard"
                className="sidebar__container__menu__options__list__link"
              >
                <img
                  src="/photo/admin/dashboard.png"
                  alt="dashboard"
                  className="sidebar__container__menu__options__list__link__image"
                />
                <span className="sidebar__container__menu__options__list__link__title">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="sidebar__container__menu__options__list">
              <Link
                to="/admin/products"
                className="sidebar__container__menu__options__list__link"
              >
                <img
                  src="/photo/admin/product.png"
                  alt="products"
                  className="sidebar__container__menu__options__list__link__image"
                />
                <span className="sidebar__container__menu__options__list__link__title">
                  Products
                </span>
              </Link>
            </li>
            <li className="sidebar__container__menu__options__list">
              <Link
                to="/admin/product"
                className="sidebar__container__menu__options__list__link"
              >
                <img
                  src="/photo/admin/createProduct.png"
                  alt="products"
                  className="sidebar__container__menu__options__list__link__image"
                />
                <span className="sidebar__container__menu__options__list__link__title">
                  Create Products
                </span>
              </Link>
            </li>
            <li className="sidebar__container__menu__options__list">
              <Link
                to="/admin/orders"
                className="sidebar__container__menu__options__list__link"
              >
                <img
                  src="/photo/admin/order.png"
                  alt="dashboard"
                  className="sidebar__container__menu__options__list__link__image"
                />
                <span className="sidebar__container__menu__options__list__link__title">
                  Orders
                </span>
              </Link>
            </li>
            <li className="sidebar__container__menu__options__list">
              <Link
                to="/admin/users"
                className="sidebar__container__menu__options__list__link"
              >
                <img
                  src="/photo/admin/users.png"
                  alt="users"
                  className="sidebar__container__menu__options__list__link__image"
                />
                <span className="sidebar__container__menu__options__list__link__title">
                  Users
                </span>
              </Link>
            </li>
            <li className="sidebar__container__menu__options__list">
              <Link
                to="/admin/reviews"
                className="sidebar__container__menu__options__list__link"
              >
                <img
                  src="/photo/admin/review.png"
                  alt="reviews"
                  className="sidebar__container__menu__options__list__link__image"
                />
                <span className="sidebar__container__menu__options__list__link__title">
                  Reviews
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
