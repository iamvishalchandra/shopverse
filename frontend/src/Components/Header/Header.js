import React from "react";
import "./Header.style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container  header__container__left">
        <div className="header__container__left__logo">
          <img
            className="header__container__left__logo__image"
            src="/photo/logo.png"
            alt=""
          />
        </div>
      </div>

      <div className="header__container header__container__mid">
        <div className="header__container__mid__input">
          <input
            type="text"
            className="header__container__mid__input__searchBar"
            placeholder="Enter Product Name...  "
          />
          <div className="header__container__mid__input__btn">
            <img
              className="header__container__mid__input__btn__searchIcon"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
              alt=""
            />
            {/* <i className="header__container__mid__input__btn__icon">🔍</i> */}
          </div>
        </div>
      </div>

      <div className="header__container header__container__right">
        <button className="header__container__right__loginBtn">Login</button>
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
