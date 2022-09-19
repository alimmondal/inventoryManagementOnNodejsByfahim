const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { colors } = require("colors");
const productRoute = require("./routes/product.route");

// middle wares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, ema watson");
});

//posting to database
app.use("/api/v1/product", productRoute);

module.exports = app;
