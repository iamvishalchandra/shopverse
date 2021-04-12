import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import LoggingOptions from "../LoggingOptions/LoggingOptions";
import MetaData from "../MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./CreateProduct.style.css";

const CreateProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());

      if (success) {
        history.push("/admin/products");
        alert.success("Product Successfully Created");
        dispatch({ type: NEW_REVIEW_RESET });
      }
    }
  }, [dispatch, alert, error, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(files);
    });
  };
  return (
    <div className="createProduct">
      <MetaData title="Create New Product" />
      <Sidebar />
      <div>
        <h1>New Product</h1>
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <LoggingOptions
            type="text"
            id="name_field"
            text="Name"
            values={name}
            setValues={setName}
          />
          {/* <div>
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}
          <LoggingOptions
            type="number"
            id="price_field"
            text="Price"
            values={price}
            setValues={setPrice}
          />
          {/* <div>
            <label htmlFor="price_field">Price</label>
            <input
              type="number"
              id="price_field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div> */}

          <div>
            <label htmlFor="description_field">Description</label>
            <textarea
              id="description_field"
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="category_field">Category</label>
            <select
              id="category_field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <LoggingOptions
            type="number"
            id="stock_field"
            text="Stock"
            values={stock}
            setValues={setStock}
          />
          {/* <div>
            <label htmlFor="stock_field">Stock</label>
            <input
              type="number"
              id="stock_field"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div> */}
          <LoggingOptions
            type="text"
            id="seller_field"
            text="Seller"
            values={seller}
            setValues={setSeller}
          />
          {/* <div>
            <label htmlFor="seller_field">Seller</label>
            <input
              type="text"
              id="seller_field"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
            />
          </div> */}
          <div>
            <label>images</label>
            <div>
              <input
                type="file"
                name="product_images"
                id="customFile"
                multiple
                onChange={onChange}
              />
              <label htmlFor="customFile">Choose Image</label>
            </div>
            {imagesPreview?.map((image) => (
              <img src={image} key={image} alt="Product Images" />
            ))}
          </div>

          <button type="submit" disabled={loading ? true : false}>
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
