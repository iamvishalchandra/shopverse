import React, { useState } from "react";
import "./LoggingOptions.style.css";

const LoggingOptions = ({ type, id, text, values, setValues, register }) => {
  return (
    <div className="loggingOptions">
      <label htmlFor={id} className="loggingOptions__label">
        {text}
      </label>
      {register === true ? (
        <input
          type={type}
          id={id}
          value={values}
          name={type}
          onChange={setValues}
          className="loggingOptions__input"
        />
      ) : (
        <input
          type={type}
          id={id}
          value={values}
          onChange={(e) => setValues(e.target.value)}
          className="loggingOptions__input"
        />
      )}
    </div>
  );
};

export default LoggingOptions;
