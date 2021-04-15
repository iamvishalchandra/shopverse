import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.style.css";

const Sidebar = () => {
  const [show, setShow] = useState(true);
  const [productMenu, setProductMenu] = useState(false);
  return (
    <div className="sidebar" style={{ width: !show && "70px" }}>
      <div onClick={() => setShow(!show)} className="sidebar__toggle">
        {show ? "<" : ">"}
      </div>
      (
      <nav className="sidebar__navbar">
        <ul className="sidebar__navbar__options">
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__dashboard">
            <Link
              to="/dashboard"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__dashboard"
            >
              <img
                src="/photo/admin/dashboard.png"
                alt=""
                className="sidebar__navbar__options__list__links__icon"
              />
              {show && "Dashboard"}
            </Link>
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__products">
            <Link
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__products"
              onClick={() => setProductMenu(!productMenu)}
            >
              <img
                src="/photo/admin/product.png"
                alt=""
                className="sidebar__navbar__options__list__links__icon"
              />
              {show && "Products"}
            </Link>
            {productMenu === true && (
              <ul
                id="productSubmenu"
                className="sidebar__navbar__options__list__products__innerOptions sidebar__navbar__options__list__innerOptions"
              >
                <li className="sidebar__navbar__options__list__innerOptions__list sidebar__navbar__options__list__products__innerOptions__list__all">
                  <Link
                    to="/admin/products"
                    className="sidebar__navbar__options__list__innerOptions__list__links"
                  >
                    <img
                      src="/photo/eye-512.png"
                      alt=""
                      className="sidebar__navbar__options__list__links__icon"
                    />
                    {show && "All"}
                  </Link>
                </li>
                <li className="sidebar__navbar__options__list__innerOptions__list sidebar__navbar__options__list__products__innerOptions__list__create">
                  <Link
                    to="/admin/product"
                    className="sidebar__navbar__options__list__innerOptions__list__links"
                  >
                    <img
                      src="/photo/admin/createProduct.png"
                      alt=""
                      className="sidebar__navbar__options__list__links__icon"
                    />
                    {show && "Create"}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__orders">
            <Link
              to="/admin/orders"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__orders"
            >
              <img
                src="/photo/admin/order.png"
                alt=""
                className="sidebar__navbar__options__list__links__icon"
              />
              {show && "Orders"}
            </Link>
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__users">
            <Link
              to="/admin/users"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__users"
            >
              <img
                src="/photo/admin/users.png"
                alt=""
                className="sidebar__navbar__options__list__links__icon"
              />
              {show && "Users"}
            </Link>
          </li>
          <li className="sidebar__navbar__options__list sidebar__navbar__options__list__reviews">
            <Link
              to="/admin/reviews"
              className="sidebar__navbar__options__list__links sidebar__navbar__options__list__links__reviews"
            >
              <img
                style={{
                  width: "20px",
                  height: "20px",
                }}
                src="/photo/admin/review.png"
                alt=""
                className="sidebar__navbar__options__list__links__icon"
              />
              {show && "Reviews"}
            </Link>
          </li>
        </ul>
      </nav>
      )
    </div>
  );
};

export default Sidebar;
