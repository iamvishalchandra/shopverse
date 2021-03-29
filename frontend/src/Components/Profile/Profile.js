import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import "./Profile.style.css";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <div className="profile">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user?.name}`} />
          <h2 className="profile__title">My Profile</h2>
          <div className="profile__container">
            <div className="profile__container__avatar">
              <figure className="profile__container__avatar__figure">
                <img
                  src={user.avatar?.url}
                  alt={user.name}
                  className="profile__container__avatar__figure__photo"
                />
              </figure>
              <Link
                className="profile__container__avatar__figure__editProfile profile__container__links"
                to="/me/update"
              >
                Edit Profile
              </Link>
            </div>
            <div className="profile__container__details">
              <ProfileDetails heading="Full Name" value={user?.name} />
              <ProfileDetails heading="Email Address" value={user?.email} />
              <ProfileDetails
                heading="Member Since"
                value={String(user?.createdAt).substring(0, 10)}
              />

              {user?.role !== "admin" && (
                <Link
                  to="/orders/me"
                  className="profile__container__details__orders profile__container__links"
                >
                  My Orders
                </Link>
              )}
              <Link
                to="/password/update"
                className="profile__container__details__changePassword profile__container__links"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
