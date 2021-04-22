import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteSingleProduct,
  getAdminProducts,
} from "../../../actions/productActions";
// import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./AdminProductList.style.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../../reUseable/MetaData";
import Loader from "../../reUseable/Loader/Loader";
import { MDBDataTable } from "mdbreact";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import { textTruncate } from "../../../helpers/useFullFunctions";
import PaginationComponent from "../../reUseable/PaginationComponent/PaginationComponent";

const AdminProductList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state?.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state?.deleteProduct
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(`Product is Deleted Successfully`);
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const setProducts = () => {
    const data = {
      columns: [
        { title: "ID", id: "id", sort: "asc" },
        { title: "Name", id: "name", sort: "asc" },
        { title: "Price", id: "price", sort: "asc" },
        { title: "Stock", id: "stock", sort: "asc" },
        { title: "Actions", id: "actions" },
      ],
      rows: [],
    };

    products?.forEach((product) => {
      data?.rows?.push({
        id: product._id,
        name: textTruncate(product.name, 30),
        price: `₹${product.price}`,
        stock: product.stock,

        actions: (
          <div className="adminProductList__container__content__actions">
            <button className="adminProductList__container__content__actions__button adminProductList__container__content__actions__button--edit">
              <Link to={`/admin/product/${product._id}`}>
                <img
                  src="/photo/edit-3-512.png"
                  alt="productimg"
                  className="adminProductList__container__content__actions__button__icon"
                />
              </Link>
            </button>
            <button
              className="adminProductList__container__content__actions__button adminProductList__container__content__actions__button--delete"
              onClick={() => deleteProductHandle(product._id)}
            >
              <img
                className="adminProductList__container__content__actions__button__icon"
                src="/photo/delete-512.png"
                alt=""
              />
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  const deleteProductHandle = (id) => {
    dispatch(deleteSingleProduct(id));
  };

  return (
    <div className="adminProductList">
      <MetaData title="Product List" />
      <div className="adminProductList__sidebaar">
        <Sidebar />
      </div>
      <div className="adminProductList__container">
        <h1 className="adminProductList__container__title">All Product List</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="adminProductList__container__content">
            <PaginationComponent tableData={setProducts()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
