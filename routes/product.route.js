const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/product.controller");

router
  .route("/")
  .get(productsControllers.getProducts)
  .post(productsControllers.createProduct);

router
  .route("/:id")
  .patch(productsControllers.updateProduct)
  .delete(productsControllers.deleteProductById);

module.exports = router;
