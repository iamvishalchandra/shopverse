import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../actions/productActions";
import MetaData from "../MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.style.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  let outOfStock = 0;
  products?.forEach((product) => {
    if (product.stock === 0) outOfStock++;
  });

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard" />
      <div>
        <Sidebar />
      </div>
      <div>
        <h1>Dashboard</h1>

        <div>
          <div>
            <div>
              <div>
                <div>
                  Total Amount <br />
                  <b>Rs 100</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <div>
                <div>
                  Products <br />
                  <b>{products?.length}</b>
                </div>
              </div>
              <Link to="/admin/products">
                <span>View Details</span>
                <span></span>
                <span>
                  <i></i>
                </span>
              </Link>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div>
                  Orders <br />
                  <b>125</b>
                </div>
              </div>
              <Link to="/admin/orders">
                <span>View Details</span>
                <span>
                  <i></i>
                </span>
              </Link>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div>
                  Usera <br /> <b>43</b>
                </div>
              </div>
              <Link to="/admin/users">
                <span>View Details</span>
                <span>
                  <i></i>
                </span>
              </Link>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div>
                  Out Of Stock <br /> <b>{outOfStock}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
