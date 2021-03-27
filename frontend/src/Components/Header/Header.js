import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import UserOptions from "../UserOptions/UserOptions";
import "./Header.style.css";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [userOptions, setUserOptions] = useState(false);

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
        <Link to="/cart">
          <div className="header__container__right__cart">
            <span className="header__container__right__cart__span header__container header__container__right__cart__span--count">
              2
            </span>
            <span className="header__container__right__cart__span header__container header__container__right__cart__span--text">
              Cart
            </span>
          </div>
        </Link>
        {user ? (
          <>
            {/* <Link to="#!">
              <button className="header__container__right__button header__container__right__logoutBtn">
                Logout
              </button>
            </Link> */}

            <div
              className="header__container__right__user"
              onClick={() => setUserOptions(!userOptions)}
            >
              <img
                className="header__container__right__user__avatar"
                src={user?.avatar?.url}
                alt={user?.name}
              />
              <span className="header__container__right__user__name">
                {user?.name}
              </span>
              {userOptions && <UserOptions user={user} />}
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
