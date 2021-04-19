import React from "react";

import { Link } from "react-router-dom";
import {
  amountFormatter,
  dateFormatter,
} from "../../../helpers/useFullFunctions";
import "./OrderInfo.style.css";

const OrderInfo = ({
  order,
  isUser,
  isAdmin,
  isAdminList,
  status,
  setStatus,
  updateOrder,
  deleteOrder,
}) => {
  return (
    <div className="orderInfo">
      <div className="orderInfo__top">
        <div className="orderInfo__top__left">
          <div className="orderInfo__top__left__items orderInfo__top__left__items--date">
            <div className="orderInfo__top__left__items__title">Ordered</div>
            <div className="orderInfo__top__left__items__value">
              {dateFormatter(order?.createdAt)}
            </div>
          </div>
          <div className="orderInfo__top__left__items orderInfo__top__left__items--total">
            <div className="orderInfo__top__left__items__title">Total</div>
            <div className="orderInfo__top__left__items__value">
              ₹{amountFormatter(order?.totalPrice)}
            </div>
          </div>
          <div className="orderInfo__top__left__items orderInfo__top__left__items--shipping">
            <div className="orderInfo__top__left__items__title">Shipped At</div>
            <div className="orderInfo__top__left__items__value">
              <div className="orderInfo__top__left__items__value__customer">
                {order?.user?.email ? order?.user?.email : "View Details"}
              </div>
              <div className="orderInfo__top__left__items__value__shippingInfo">
                <div>
                  {order?.user?.name ? order?.user?.name : "Deliver To: "}
                </div>
                <div>{order?.shippingInfo?.address}</div>
                <div>
                  {`${order?.shippingInfo?.city}, ${order?.shippingInfo?.country}`}
                </div>
                <div>{order?.shippingInfo?.postalCode}</div>
                <div></div>
                {order?.shippingInfo?.country}
                <div>{`Phone: ${order?.shippingInfo?.contactNo}`}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="orderInfo__top__mid">
          <div className="orderInfo__top__mid__title">
            Delivery Status: {order?.orderStatus}
          </div>

          {isAdmin ? (
            <div className="orderInfo__top__mid__delivery">
              <select
                className="orderInfo__top__mid__delivery__select"
                name="status"
                id={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option
                  className="orderInfo__top__mid__delivery__select__option"
                  value="Processing"
                  defaultChecked
                >
                  Processing
                </option>
                <option
                  className="orderInfo__top__mid__delivery__select__option"
                  value="Shipped"
                >
                  Shipped
                </option>
                <option
                  className="orderInfo__top__mid__delivery__select__option"
                  value="Delivered"
                >
                  Delivered
                </option>
              </select>
              <button
                onClick={() => updateOrder(order._id)}
                className="orderInfo__top__mid__delivery__button"
              >
                Update Status
              </button>
            </div>
          ) : (
            <div
              style={{
                color:
                  order?.orderStatus === "Shipped"
                    ? "purple"
                    : order?.orderStatus === "Delivered"
                    ? "green"
                    : "red",
                fontWeight: "bold",
              }}
              className="orderInfo__top__mid__orderStatus"
            >
              {order.orderStatus}
            </div>
          )}
        </div>

        <div className="orderInfo__top__right__items orderInfo__top__right__items--orderNo">
          <div className="orderInfo__top__right__items__text">
            Order #{order?._id}
          </div>
          <div className="orderInfo__top__right__items__content">
            <Link>Order Details</Link>
            <hr />
            <Link>Invoice</Link>
          </div>
        </div>
      </div>

      {/* products */}

      <div className="orderInfo__products">
        {(isAdmin || isAdminList) && (
          <div className="orderInfo__products__adminActions ">
            <Link to={`/order/detail/${order._id}`}>
              <button className="orderInfo__products__container__items__info__button orderInfo__buttons">
                <img
                  className="orderInfo__products__container__items__info__button__icon"
                  src="/photo/eye-512.png"
                  alt=""
                />
                Order Info
              </button>
            </Link>
            {isAdminList && (
              <Link to={`/admin/order/${order._id}`}>
                <button
                  className="orderInfo__products__container__items__info__button orderInfo__buttons"
                  style={{ backgroundColor: "skyblue" }}
                >
                  <img
                    className="orderInfo__products__container__items__info__button__icon"
                    src="/photo/edit-3-512.png"
                    alt=""
                  />
                  Update Order
                </button>
              </Link>
            )}
            {isAdmin && (
              <Link to={`/admin/orders`}>
                <button
                  className="orderInfo__products__container__items__info__button orderInfo__buttons"
                  style={{ backgroundColor: "skyblue" }}
                >
                  {/* <img
                    className="orderInfo__products__container__items__info__button__icon"
                    src="/photo/edit-3-512.png"
                    alt=""
                  /> */}
                  Back to Orders
                </button>
              </Link>
            )}
            <button
              className="orderInfo__products__container__items__info__button orderInfo__buttons"
              style={{ backgroundColor: "red" }}
              onClick={() => deleteOrder(order._id)}
            >
              <img
                className="orderInfo__products__container__items__info__button__icon"
                src="/photo/delete-512.png"
                alt=""
              />
              Delete Order
            </button>
          </div>
        )}
        {order?.orderItems?.map((item) => (
          <div
            className="orderInfo__products__container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            <div className="orderInfo__products__container__items">
              <img
                src={item.image}
                alt={item.name}
                className="orderInfo__products__container__items__image"
              />

              <div className="orderInfo__products__container__items__info">
                <Link
                  to={`/product/${item.product}`}
                  className="orderInfo__products__container__items__info__name"
                >
                  {item.name}
                </Link>
                <div className="orderInfo__products__container__items__info__status">
                  <h3 className="orderInfo__products__container__items__info__status__text">
                    Payment:
                  </h3>
                  <h4
                    className="orderInfo__products__container__items__info__status__value"
                    style={{
                      color:
                        order?.paymentInfo?.status === "succeeded"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {order?.paymentInfo?.status}
                  </h4>
                </div>
                <div className="orderInfo__products__container__items__info__status">
                  <h3 className="orderInfo__products__container__items__info__status__text">
                    Payment ID:
                  </h3>
                  <h4 className="orderInfo__products__container__items__info__status__value">
                    {order?.paymentInfo?.id}
                  </h4>
                </div>
                <div className="orderInfo__products__container__items__info__status">
                  <h3 className="orderInfo__products__container__items__info__status__text">
                    Delivery:
                  </h3>
                  <h4
                    className="orderInfo__products__container__items__info__status__value"
                    style={{
                      color:
                        order?.orderStatus === "Shipped"
                          ? "purple"
                          : order?.orderStatus === "Delivered"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {order?.orderStatus}
                  </h4>
                </div>
                {isUser && (
                  <div className="orderInfo__products__container__items__info__userActions">
                    <Link to={`/product/${item.product}`}>
                      <button className="orderInfo__products__container__items__info__userActions__button orderInfo__buttons">
                        Buy Again
                      </button>
                    </Link>
                    <Link to={`/order/detail/${order._id}`}>
                      <button className="orderInfo__products__container__items__info__userActions__button orderInfo__buttons">
                        <img
                          className="orderInfo__products__container__items__info__userActions__button__icon"
                          src="/photo/eye-512.png"
                          alt=""
                        />
                        Order Info
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderInfo;
