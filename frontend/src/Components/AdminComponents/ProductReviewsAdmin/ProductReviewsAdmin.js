import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteProductReviewAction,
  productReviewsAction,
} from "../../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";
import MetaData from "../../reUseable/MetaData";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import PaginationComponent from "../../reUseable/PaginationComponent/PaginationComponent";
import Sidebar from "../Sidebar/Sidebar";
import "./ProductReviewsAdmin.style.css";

const ProductReviewsAdmin = () => {
  const [productId, setProductId] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, reviews } = useSelector(
    (state) => state?.productReviews
  );

  const { isReviewDeleted } = useSelector((state) => state.deleteProductReview);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isReviewDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    // if (productId !== "") dispatch(productReviewsAction(productId));
  }, [dispatch, alert, error, isReviewDeleted]);

  const deleteHandle = (id) => {
    dispatch(deleteProductReviewAction(id, productId));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(productReviewsAction(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        { title: "Review ID", id: "id", sort: "asc" },
        { title: "Rating", id: "rating", sort: "asc" },
        { title: "Comment", id: "comment", sort: "asc" },
        { title: "User", id: "user", sort: "asc" },
        { title: "Actions", id: "actions", sort: "asc" },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <button
            className="productReviewsAdmin__container__body__table__delete"
            onClick={() => deleteHandle(review._id)}
          >
            <img
              className="productReviewsAdmin__container__body__table__delete__icon"
              src="/photo/delete-512.png"
              alt="delete"
            />
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <div className="productReviewsAdmin">
      <MetaData title="Product Reviews" />
      <Sidebar />
      <div className="productReviewsAdmin__container">
        <h1 className="productReviewsAdmin__container__title">
          Product Reviews
        </h1>

        <div className="productReviewsAdmin__container__body">
          <form
            className="productReviewsAdmin__container__body__form"
            onSubmit={submitHandle}
          >
            <FormOptions
              formItem="input"
              type="text"
              text="Seacrh Product Review"
              id="serchProduct_field"
              name="serchProduct"
              placeholder="Enter Product Id"
              values={productId}
              setValues={(e) => setProductId(e.target.value)}
            />
            <FormOptions
              formItem="button"
              type="submit"
              text="Seacrh"
              disabled={loading}
            />
          </form>
          {reviews?.length > 0 ? (
            <div className="productReviewsAdmin__container__body__table">
              <PaginationComponent tableData={setReviews()} />
            </div>
          ) : (
            <p className="productReviewsAdmin__container__body__noReviews">
              No Reviews
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsAdmin;
