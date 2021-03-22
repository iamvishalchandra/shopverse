import React from "react";
import { Link, Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container  header__container__left">
        <div className="header__container__left__logo">
          <Link to="/">
            <img
              className="header__container__left__logo__image"
              src="/photo/logo.png"
              alt=""
            />
          </Link>
        </div>
      </div>

      <div className="header__container header__container__mid">
        <Route render={({ history }) => <SearchBar history={history} />} />
      </div>

      <div className="header__container header__container__right">
        <Link to="/login">
          <button className="header__container__right__loginBtn">Login</button>
        </Link>
        <div className="header__container header__container__right__cart">
          <span className="header__container header__container__right__cart__span header__container header__container__right__cart__span--count">
            2
          </span>
          <span className="header__container header__container__right__cart__span header__container header__container__right__cart__span--text">
            Cart
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
