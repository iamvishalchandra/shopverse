import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../../actions/orderActions";
import { getAdminProducts } from "../../../actions/productActions";
import { allUsersActions } from "../../../actions/userActions";
import { amountFormatter } from "../../../helpers/useFullFunctions";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.style.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { loading, totalAmount, orders } = useSelector(
    (state) => state.allOrders
  );
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products?.forEach((product) => {
    if (product.stock === 0) outOfStock++;
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(allUsersActions());
  }, [dispatch]);

  const dashboardItems = [
    { name: "TotalAmount", value: `₹${amountFormatter(totalAmount)}` },
    { name: "Products", value: products?.length, url: "/admin/products" },
    { name: "Orders", value: orders?.length, url: "/admin/orders" },
    { name: "Users", value: users.length, url: "/admin/users" },
    { name: "Out Of Stock", value: outOfStock },
  ];

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin" />

      <Sidebar />

      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard__container">
          <h1 className="dashboard__container__title">Dashboard</h1>
          <div className="dashboard__container__sections">
            {dashboardItems.map((item) => (
              <div
                className={`dashboard__container__sections__body dashboard__container__sections__body--${item.name
                  .replace(/\s+/g, "")
                  .trim()
                  .toLowerCase()}`}
                key={item.name}
              >
                <div className="dashboard__container__sections__body__innerSection">
                  <div className="dashboard__container__sections__body__innerSection__details">
                    <div className="dashboard__container__sections__body__innerSection__details__name">
                      {item.name}
                    </div>
                    <div className="dashboard__container__sections__body__innerSection__details__value">
                      {item.value}
                    </div>
                  </div>

                  <Link
                    to={`${item.url}`}
                    style={{
                      visibility: item.url ? "visible" : "hidden",
                      display: item.name === "TotalAmount" && "none",
                    }}
                  >
                    <div className="dashboard__container__sections__body__innerSection__view">
                      <span className="dashboard__container__sections__body__innerSection__view__text">
                        View Details
                      </span>
                      <span className="dashboard__container__sections__body__innerSection__view__icon">
                        {">"}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
