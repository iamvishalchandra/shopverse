import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.style.css";

const Sidebar = () => {
  const [productMenu, setProductMenu] = useState(false);
  return (
    <div className="sidebar">
      <nav className="sidebar__navbar">
        <ul className="sidebar__navbar__options">
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__dashboard">
            <Link
              to="/dashboard"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__dashboard"
            >
              <i></i>Dashboard
            </Link>
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__products">
            <a
              href="#productSubmenu"
              data-toggle="colapse"
              aria-expanded="false"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__products"
              // onClick={() => setProductMenu(!productMenu)}
            >
              <i></i>Products
            </a>
            {/* {productMenu === true && ( */}
            <ul
              id="productSubmenu"
              className="sidebar__navbar__options__list__products__innerOptions sidebar__navbar__options__list__innerOptions"
            >
              <li className="sidebar__navbar__options__list__innerOptions__list sidebar__navbar__options__list__products__innerOptions__list__all">
                <Link
                  to="/admin/products"
                  className="sidebar__navbar__options__list__innerOptions__list__links"
                >
                  <i></i>All
                </Link>
              </li>
              <li className="sidebar__navbar__options__list__innerOptions__list sidebar__navbar__options__list__products__innerOptions__list__create">
                <Link
                  to="/admin/product"
                  className="sidebar__navbar__options__list__innerOptions__list__links"
                >
                  <i></i>Create
                </Link>
              </li>
            </ul>
            {/* )} */}
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__orders">
            <Link
              to="/admin/orders"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__orders"
            >
              <i></i>Orders
            </Link>
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__users">
            <Link
              to="/admin/users"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__users"
            >
              <i></i>Users
            </Link>
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__reviews">
            <Link
              to="/admin/reviews"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__reviews"
            >
              <i></i>Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
