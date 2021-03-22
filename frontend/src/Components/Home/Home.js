import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Home.style.css";
const { createSliderWithTooltip } = Slider;

const Range = createSliderWithTooltip(Slider.Range);
const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPriceRange, maxPriceRange] = [1, 10000]; //Initial Price Range
  const [priceRange, setPriceRange] = useState([minPriceRange, maxPriceRange]);
  const dispatch = useDispatch();
  const alert = useAlert();
  const keyword = match.params.keyword;
  const {
    loading,
    products,
    error,
    productsCount,
    filteredProductsCount,
    resultsPerPage,
  } = useSelector((state) => state.products);

  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Accesories",
    "Beauty",
    "Books",
    "Clothes",
    "Computers",
    "Electronics",
    "Entertainment",
    "Food",
    "Gaming",
    "Headphones",
    "Health",
    "Home",
    "Cameras",
    "Laptop",
    "Movies",
    "Outdoors",
    "Shows",
    "Sports",
    "Television",
    "Video",
  ];

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage, keyword, priceRange, category, rating));
  }, [
    dispatch,
    alert,
    error,
    currentPage,
    keyword,
    priceRange,
    category,
    rating,
  ]);

  let count = resultsPerPage;
  if (keyword) count = filteredProductsCount;

  return (
    <div className="home">
      <MetaData title={`Buy Best Products Online`} />

      <h1 className="home__h1 home__h1--latestProds">Latest Products</h1>

      <section className="home__section">
        {keyword ? (
          <div className="home__section__keyword">
            <div className="home__section__keyword__slider">
              <Range
                marks={{
                  1: `Rs.${minPriceRange}`,
                  100000: `Rs.${maxPriceRange}`,
                }}
                min={minPriceRange}
                max={maxPriceRange}
                defaultValue={[minPriceRange, maxPriceRange]}
                tipFormatter={(value) => `Rs.${value}`}
                tipProps={{ placement: "top", visible: true }}
                value={priceRange}
                onChange={(priceRange) => setPriceRange(priceRange)}
              />
            </div>
            <div className="home__section__keyword__category">
              <h4 className="home__section__keyword__category__title">
                Category
              </h4>
              <ul className="home__section__keyword__category__list">
                {categories.map((category) => (
                  <li
                    className="home__section__keyword__category__list__items"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="home__section__keyword__rating">
              <h4 className="home__section__keyword__rating__title">Rating</h4>
              <ul className="home__section__keyword__rating__list">
                {[5, 4, 3, 2, 1].map((star) => (
                  <li
                    className="home__section__keyword__rating__list__items"
                    key={star}
                    onClick={() => setRating(star)}
                  >
                    🌟{star} Stars
                  </li>
                ))}
              </ul>
            </div>
            <div className="home__section">
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
                    ratings={product.rating}
                  />
                ))
              )}
            </div>
          </div>
        ) : loading ? (
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

      {resultsPerPage <= count && (
        <div className="home__paination">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={productsCount}
            firstPageText={"First"}
            nextPageText={">"}
            prevPageText={"<"}
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
