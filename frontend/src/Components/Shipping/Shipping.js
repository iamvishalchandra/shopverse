import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { countries } from "countries-list";
import MetaData from "../MetaData";

import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import "./Shipping.style.css";
import FormOptions from "../reUseable/FormOptions/FormOptions";

const Shipping = ({ history }) => {
  const countryList = Object.values(countries);
  let countryName = [];
  countryList?.forEach((country) => countryName?.push(country?.name));

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || 1);
  const [contactNo, setContactNo] = useState(shippingInfo.contactNo);
  const [country, setCountry] = useState(
    shippingInfo.country ? shippingInfo.country : countryList[0].name
  );

  const dispatch = useDispatch();

  const submitHandle = (e) => {
    dispatch(
      saveShippingInfo({
        address,
        city,
        postalCode,
        contactNo,
        country,
      })
    );
    history.push("/order/confirm");
  };

  return (
    <div className="shipping">
      <MetaData title="Shipping" />
      <CheckOutSteps shipping />
      <div className="shipping__body">
        <h1 className="shipping__body__title">Shipping Info</h1>
        <form onSubmit={submitHandle} className="shipping__body__title__form">
          <FormOptions
            formItem="input"
            type="text"
            name="address"
            id="address_field"
            text="Adddress"
            values={address}
            setValues={(e) => setAddress(e.target.value)}
          />
          {/* <ShippingInfo
            text="Adddress"
            id="address_field"
            types="text"
            values={address}
            setValues={setAddress}
          /> */}

          <FormOptions
            formItem="input"
            type="text"
            id="city_field"
            name="city"
            text="City"
            values={city}
            setValues={(e) => setCity(e.target.value)}
          />

          {/* <ShippingInfo
            text="City"
            id="city_field"
            types="text"
            values={city}
            setValues={setCity}
          /> */}
          <FormOptions
            formItem="input"
            type="tel"
            id="phone_field"
            name="phone"
            placeholder="+91"
            text="Phone"
            values={contactNo}
            setValues={(e) => setContactNo(e.target.value)}
          />
          {/* <ShippingInfo
            text="Phone"
            id="phone_field"
            types="tel"
            values={contactNo}
            setValues={setContactNo}
          /> */}

          <FormOptions
            formItem="input"
            type="number"
            id="postal_code_field"
            name="postalCode"
            text="Postal Code"
            values={postalCode}
            minValue={1}
            setValues={(e) => setPostalCode(e.target.value)}
          />

          {/* <ShippingInfo
            text="Postal Code"
            id="postal_code_field"
            types="number"
            values={postalCode}
            setValues={setPostalCode}
          /> */}
          <FormOptions
            formItem="dropdown"
            id="country_field"
            name="country"
            text="Country"
            values={country}
            setValues={(e) => setCountry(e.target.value)}
            dropdownList={countryName}
          />

          {/* <div>
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
          </div> */}
          <FormOptions
            formItem="button"
            text="Continue"
            type="submit"
            setValues={(e) => null}
          />
        </form>
      </div>
    </div>
  );
};

export default Shipping;
