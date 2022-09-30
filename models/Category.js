const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a category name"],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
  },
  {
    timestamps: true,
  }
);

//SCHEMA > MODEL > QUERY
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
