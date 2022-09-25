const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a brand name"],
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
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
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      type: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

//SCHEMA > MODEL > QUERY
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
