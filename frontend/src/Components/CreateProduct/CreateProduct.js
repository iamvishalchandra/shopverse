import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productActions";
import { CREATE_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../MetaData";
import FormOptions from "../reUseable/FormOptions/FormOptions";
import Sidebar from "../AdminComponents/Sidebar/Sidebar";
import "./CreateProduct.style.css";

const CreateProduct = ({ history }) => {
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
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState(10);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state?.createProduct
  );

  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/products");

      alert.success("Product Successfully Created");
      dispatch({ type: CREATE_PRODUCT_RESET });
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

      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="createProduct">
      <MetaData title="Create New Product" />
      <Sidebar />
      <div className="createProduct__container">
        <h1 className="createProduct__container__title">New Product</h1>
        <form
          className="createProduct__container__form"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
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

          {/* <div> */}
          <FormOptions
            formItem="input"
            type="file"
            text="Choose Product Images"
            name="product_images"
            id="customFile"
            multiple
            setValues={onChange}
          />
          <div className="createProduct__container__form__images">
            {imagesPreview?.map((image) => (
              <img
                style={{ width: "50px" }}
                src={image}
                key={image}
                alt="Product Images"
              />
            ))}
          </div>
          {/* </div> */}

          <FormOptions
            formItem="button"
            type="submit"
            disabled={loading ? true : false}
            text="Creat Product"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
