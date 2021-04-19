import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateSingleProduct,
} from "../../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import MetaData from "../../reUseable/MetaData";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import Sidebar from "../Sidebar/Sidebar";
import "./ProductUpdate.style.css";

const ProductUpdate = ({ match, history }) => {
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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(10);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state?.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.updateProduct
  );

  const productId = match.params.id;

  useEffect(() => {
    if (product?._id !== productId) dispatch(getProductDetails(productId));
    else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(product.seller);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    history,
    updateError,
    product,
    productId,
  ]);

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

    dispatch(updateSingleProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);

          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="productUpdate">
      <MetaData title="Update Product" />
      <Sidebar />
      <div>
        <h1>Product Update</h1>

        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <FormOptions
            formItem="input"
            type="text"
            name="name"
            id="name_field"
            text="Name"
            values={name}
            setValues={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
          />

          <FormOptions
            formItem="input"
            type="number"
            name="price"
            id="price_field"
            text="Price ₹"
            values={price}
            setValues={(e) => setPrice(e.target.value)}
            minValue={1}
          />
          <FormOptions
            formItem="textArea"
            id="description_field"
            name="description"
            rows="3"
            text="Description"
            values={description}
            setValues={(e) => setDescription(e.target.value)}
            placeholder="Desription"
          />

          <FormOptions
            formItem="dropdown"
            id="category_field"
            name="category"
            text="Category"
            values={category}
            setValues={(e) => setCategory(e.target.value)}
            dropdownList={categories}
          />

          <FormOptions
            formItem="input"
            type="number"
            name="stock"
            id="stock_field"
            text="Stock (Min Stock 10)"
            values={stock}
            setValues={(e) => setStock(e.target.value)}
            minValue={10}
          />

          <FormOptions
            formItem="input"
            type="text"
            name="seller"
            id="seller_field"
            text="Seller"
            values={seller}
            setValues={(e) => setSeller(e.target.value)}
            placeholder="Enter Seller Name"
          />

          <div>
            <FormOptions
              formItem="input"
              type="file"
              text="Choose Product's New Images"
              name="product_images"
              id="customFile"
              multiple
              setValues={onChange}
            />

            {oldImages?.map((image) => (
              <img
                style={{ width: "100px" }}
                src={image.url}
                key={image}
                alt={image.url}
              />
            ))}
            {imagesPreview?.map((image) => (
              <img
                style={{ width: "100px" }}
                src={image}
                key={image}
                alt="Product Images"
              />
            ))}
          </div>

          <FormOptions
            formItem="button"
            type="submit"
            disabled={loading ? true : false}
            text="Update Product"
          />
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;
