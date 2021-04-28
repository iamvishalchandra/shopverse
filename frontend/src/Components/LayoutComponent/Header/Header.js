import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import UserOptions from "../../UserOptions/UserOptions";
import "./Header.style.css";

const Header = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [userOptions, setUserOptions] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="header">
      <div className="header__container  header__container__left">
        <div className="header__container__left__logo">
          <Link to="/">
            <img
              className="header__container__left__logo__image"
              src="/photo/icon.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>

      <div className="header__container header__container__mid">
        <Route render={({ history }) => <SearchBar history={history} />} />
      </div>

      <div className="header__container header__container__right">
        <Link to="/cart">
          <div className="header__container__right__cart">
            <img
              className="header__container__right__cart__icon"
              src="/photo/cart.png"
              alt=""
            />
            <span className="header__container__right__cart__span header__container header__container__right__cart__span--count">
              {cartItems.length}
            </span>
            {/* <span className="header__container__right__cart__span header__container header__container__right__cart__span--text">
              Cart
            </span> */}
          </div>
        </Link>
        {user ? (
          <>
            <div className="header__container__right__user">
              <img
                className="header__container__right__user__avatar"
                src={user?.avatar?.url}
                alt={user?.name}
                onClick={() => setUserOptions(!userOptions)}
              />
              <span
                className="header__container__right__user__name"
                onClick={() => setUserOptions(!userOptions)}
              >
                {user?.name}
              </span>
              {userOptions && (
                <UserOptions
                  user={user}
                  userOptions={userOptions}
                  setUserOptions={setUserOptions}
                />
              )}
            </div>
          </>
        ) : (
          !loading && (
            <Link to="/login">
              <button className="header__container__right__button header__container__right__loginBtn">
                Login
              </button>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
