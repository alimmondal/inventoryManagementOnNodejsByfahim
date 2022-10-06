const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a brand name"],
      minLength: [3, "name must be three character"],
      maxLength: [100, "name is too large"],
      lowercase: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid email"],
      lowercase: true,
      trim: true,
      unique: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
          validator: () => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid phone number",
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a emergency contact number"],
      validate: {
        validator: () => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number",
      },
    },
    tradeLicenceNumber: {
      type: Number,
      required: [true, "Please provide a trade licence number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide permanent address"],
    },
    location: {
      name: {
        type: String,
        required: true,
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
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    //timestamps
  },
  {
    timestamps: true,
  }
);

//SCHEMA > MODEL > QUERY
const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
