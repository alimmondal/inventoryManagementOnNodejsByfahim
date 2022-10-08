const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid email"],
      lowercase: true,
      unique: true,
      required: [true, "please provide email/gmail"],
      trim: true,
    },
    password: {
      type: String,
      // unique: true,
      required: [true, "password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "store-manager", "admin"],
      default: "buyer",
    },
    firstName: {
      type: String,
      required: [true, "please provide a first name"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [60, "name is too large"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "please provide a last name"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [60, "name is too large"],
      trim: true,
    },
    contactNumber: {
      type: String,
      validate: [validator.isMobilePhone, "please provide a valid number"],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },

    status: {
      type: String,
      values: ["active", "inactive", "blocked"],
      default: "active",
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    //timestamps
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

//SCHEMA > MODEL > QUERY
const User = mongoose.model("User", userSchema);

module.exports = User;
