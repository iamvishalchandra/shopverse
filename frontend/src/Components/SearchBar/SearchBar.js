import React, { useState } from "react";
import "./SearchBar.style.css";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchHandle = (e) => {
    e.preventDefault();

    if (keyword.trim()) history.push(`/search/${keyword}`);
    else history.push("/");
  };
  return (
    <div className="searchbar">
      <form onSubmit={searchHandle} className="searchbar__form">
        <input
          type="text"
          className="searchbar__form__input"
          placeholder="Enter Product Name...  "
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="searchbar__form__btn" type="submit">
          <img
            className="searchbar__form__btn__searchIcon"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
            alt=""
          />
          {/* <i className="searchbar__input__btn__icon">🔍</i> */}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
