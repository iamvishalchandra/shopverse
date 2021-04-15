import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getAllOrders } from "../../../actions/orderActions";
import Loader from "../../Loader/Loader";
import MetaData from "../../MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./OrderLIstAdmin.style.css";

const OrderLIstAdmin = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Actions", field: "actions", sort: "asc" },
        { label: "Order ID", field: "id", sort: "asc" },
        { label: "Num Of Items", field: "numOfItems", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
      ],
      rows: [],
    };

    orders?.forEach((order) => {
      data?.rows?.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `₹${order.totalPrice}`,
        status: String(order.orderStatus)?.includes("Delivered") ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            {order.orderStatus}
          </p>
        ) : (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {order.orderStatus}
          </p>
        ),
        actions: (
          <div>
            <button style={{ padding: "5px", margin: "0 20px" }}>
              <Link to={`/admin/order/${order._id}`}>
                <img
                  src="/photo/edit-3-512.png"
                  style={{ padding: "3px", width: "20px" }}
                  alt=""
                />
              </Link>
            </button>
            <button
              style={{ padding: "5px" }}
              //   onClick={() => deleteProductHandle(order._id)}
            >
              <img
                src="/photo/delete-512.png"
                style={{ padding: "3px", width: "20px" }}
                alt=""
              />
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div className="orderLIstAdmin">
      <MetaData title="All Orders" />
      <Sidebar />
      <h1>Order List</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          bordered
          striped
          responsiveSm
          hover
          entriesOptions={[5, 15, 20]}
          className="listOrders__body"
        />
      )}
    </div>
  );
};

export default OrderLIstAdmin;
