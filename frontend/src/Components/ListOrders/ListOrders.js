import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderActions";
import Loader from "../Loader/Loader";
import { MDBDataTable } from "mdbreact";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./ListOrders.style.css";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const getOrders = () => {
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
          <Link to={`/order/${order._id}`}>
            <i style={{ textDecoration: "underline" }}>Check</i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <div className="listOrders">
      <MetaData title="My Orders" />
      <h1 className="listOrders__title">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={getOrders()}
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

export default ListOrders;
