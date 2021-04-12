import React, { useState } from "react";

import "./ProductImages.style.css";

const ProductImages = ({ images }) => {
  let imageUrl = [];
  images?.forEach((img) => {
    imageUrl.push(img.url);
  });
  const [displayImage, setDisplayImage] = useState(imageUrl[0]);
  console.table(imageUrl);
  return (
    <div className="productImages">
      <div className="productImages__option">
        {images?.map((image) => (
          <img
            className="productImages__option__images"
            src={image.url}
            alt=""
            onClick={() => setDisplayImage(image.url)}
          />
        ))}
      </div>
      <img
        className="productImages__topImage"
        // style={{ width: "100%", height: "500px" }}
        src={displayImage}
        alt=""
      />
    </div>
  );
};

export default ProductImages;
