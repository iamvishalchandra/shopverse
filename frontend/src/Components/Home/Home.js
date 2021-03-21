import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import ProductCard from "../ProductCard/ProductCard";
import "./Home.style.css";
const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const keyword = match.params.keyword;
  const {
    loading,
    products,
    error,
    productsCount,
    resultsPerPage,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage, keyword));
  }, [dispatch, alert, error, currentPage, keyword]);

  return (
    <div className="home">
      <MetaData title={`Buy Best Products Online`} />
      <h1 className="home__h1 home__h1--latestProds">Latest Products</h1>
      <section className="home__section">
        {loading ? (
          <Loader />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              link={product._id}
              name={product.name}
              images={product.images[0].url}
              reviews={product.totalReviews}
              price={product.price}
            />
          ))
        )}
      </section>

      {resultsPerPage <= productsCount && (
        <div className="home__paination">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={productsCount}
            firstPageText={"First"}
            nextPageText={"Next"}
            prevPageText={"Previous"}
            lastPageText={"Last"}
            itemClass="home__paination__items"
            linkClass="home__paination__links"
            linkClassFirst="home__paination__links--first"
            linkClassLast="home__paination__links--last"
            activeLinkClass="home__paination__links--link"
            onChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
