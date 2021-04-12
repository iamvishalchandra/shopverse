import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAdminProducts } from "../../actions/productActions";
// import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./AdminProductList.style.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import { MDBDataTable } from "mdbreact";

const AdminProductList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setProducts = () => {
    const data = {
      columns: [
        { label: "Actions", field: "actions" },
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Stock", field: "stock", sort: "asc" },
      ],
      rows: [],
    };

    products?.forEach((product) => {
      data?.rows?.push({
        id: product._id,
        name: product.name,
        price: `₹${product.price}`,
        stock: product.stock,

        actions: (
          <>
            <Link to={`/admin/product/${product._id}`}>
              <img
                src="/photo/edit-3-512.png"
                style={{ padding: "3px", width: "20px" }}
                alt=""
              />
            </Link>

            <img
              src="/photo/delete-512.png"
              style={{ padding: "3px", width: "20px" }}
              alt=""
            />
          </>
        ),
      });
    });

    return data;
  };

  return (
    <div className="adminProductList">
      <MetaData title="Product List" />
      <div>
        <Sidebar />
      </div>
      <div>
        <h1>All Product List</h1>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <MDBDataTable data={setProducts()} bordered striped hover />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
