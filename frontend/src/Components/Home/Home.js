import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import ProductCard from "../ProductCard/ProductCard";
import "./Home.style.css";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

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
    </div>
  );
};

export default Home;
