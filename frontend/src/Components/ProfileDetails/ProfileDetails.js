import React from "react";
import "./ProfileDetails.style.css";

const ProfileDetails = ({ heading, value }) => {
  return (
    <div className="profileDetails">
      <h4 className="profileDetails__heading">{heading}</h4>
      <p className="profileDetails__value">{value}</p>
    </div>
  );
};

export default ProfileDetails;
