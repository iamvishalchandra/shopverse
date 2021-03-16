const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Enter your produt Name`],
    trim: true,
    maxLength: [100, `Product name can't exceed 100 character`],
  },

  price: {
    type: Number,
    required: [true, `Enter product price`],
    maxLength: [5, `price can't exceed 5 character`],
    default: 0.0,
  },

  description: {
    type: String,
    required: [true, `Enter product description`],
  },

  rating: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, `Select category for the product`],
    enum: {
      values: [
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
      ],
      message: `Select category for the product`,
    },
  },

  seller: {
    type: String,
    required: [true, "Enter product seller"],
  },

  stock: {
    type: Number,
    required: [true, "Enter product stock"],
    maxLength: [5, `Stock value can't exceed 5 didgits`],
    default: 0,
  },

  totalReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User", requires: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    requires: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
