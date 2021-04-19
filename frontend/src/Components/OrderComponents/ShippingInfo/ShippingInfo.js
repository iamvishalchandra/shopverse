import React from "react";
import "./ShippingInfo.style.css";

const ShippingInfo = ({ text, id, types, values, setValues }) => {
  return (
    <div className="shippingInfo">
      <label htmlFor={id}>{text}</label>
      <input
        type={types}
        id={id}
        value={values}
        onChange={(e) => setValues(e.target.value)}
        required
      />
    </div>
  );
};

export default ShippingInfo;
