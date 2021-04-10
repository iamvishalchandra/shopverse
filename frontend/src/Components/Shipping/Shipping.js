import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { countries } from "countries-list";
import MetaData from "../MetaData";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import "./Shipping.style.css";

const Shipping = ({ history }) => {
  const countryList = Object.values(countries);

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [contactNo, setContactNo] = useState(shippingInfo.contactNo);
  const [country, setCountry] = useState(
    shippingInfo.country ? shippingInfo.country : countryList[0].name
  );

  const dispatch = useDispatch();

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, postalCode, contactNo, country })
    );
    history.push("/order/confirm");
  };

  return (
    <div className="shipping">
      <MetaData title="Shipping" />
      <CheckOutSteps shipping />
      <div>
        <form onSubmit={submitHandle}>
          <h1>Shipping Info</h1>

          <ShippingInfo
            text="Adddress"
            id="address_field"
            types="text"
            values={address}
            setValues={setAddress}
          />

          <ShippingInfo
            text="City"
            id="city_field"
            types="text"
            values={city}
            setValues={setCity}
          />

          <ShippingInfo
            text="Phone"
            id="phone_field"
            types="phone"
            values={contactNo}
            setValues={setContactNo}
          />

          <ShippingInfo
            text="Postal Code"
            id="postal_code_field"
            types="number"
            values={postalCode}
            setValues={setPostalCode}
          />

          <div>
            <label htmlFor="country_field">Country</label>
            <select
              id="country_field"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              {countryList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
