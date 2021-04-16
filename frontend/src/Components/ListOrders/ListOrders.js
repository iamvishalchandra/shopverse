import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import "./ListOrders.style.css";
import OrderInfo from "../reUseable/OrderInfo/OrderInfo";

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

  // const getOrders = () => {
  //   const data = {
  //     columns: [
  //       { label: "Actions", field: "actions", sort: "asc" },
  //       { label: "Order ID", field: "id", sort: "asc" },
  //       { label: "Num Of Items", field: "numOfItems", sort: "asc" },
  //       { label: "Amount", field: "amount", sort: "asc" },
  //       { label: "Status", field: "status", sort: "asc" },
  //     ],
  //     rows: [],
  //   };

  //   orders?.forEach((order) => {
  //     data?.rows?.push({
  //       id: order._id,
  //       numOfItems: order.orderItems.length,
  //       amount: `₹${order.totalPrice}`,
  //       status: String(order.orderStatus)?.includes("Delivered") ? (
  //         <p style={{ color: "green", fontWeight: "bold" }}>
  //           {order.orderStatus}
  //         </p>
  //       ) : (
  //         <p style={{ color: "red", fontWeight: "bold" }}>
  //           {order.orderStatus}
  //         </p>
  //       ),
  //       actions: (
  //         <button>
  //           <Link to={`/order/detail/${order._id}`}>
  //             <img
  //               src="/photo/eye-512.png"
  //               style={{ width: "20px", alignContent: "center" }}
  //               alt=""
  //             />
  //           </Link>
  //         </button>
  //       ),
  //     });
  //   });

  //   return data;
  // };

  return (
    <div className="listOrders">
      <MetaData title="My Orders" />
      <h1 className="listOrders__title">Your Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {orders?.map((order) => (
            <OrderInfo order={order} isUser />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOrders;
