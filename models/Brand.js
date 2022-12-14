const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a brand name"],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid email"],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      values: ["active", "inactive"],
      default: "active",
    },
    //timestamps
  },
  {
    timestamps: true,
  }
);

//SCHEMA > MODEL > QUERY
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
