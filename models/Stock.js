const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      // unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide valid url(s)"],
      },
    ],
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    categories: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "please provide a brand name"],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chottogram",
            "rajshahi",
            "sylhet",
            "khulna",
            "rangpur",
            "barishal",
            "mymenshing",
          ],
          message: "{VALUE} is not a valid name.",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "please provide a supplier name"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre/ post
stockSchema.pre("save", function (next) {
  console.log("Before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// productSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.name}`);
// };

//SCHEMA > MODEL > QUERY
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
