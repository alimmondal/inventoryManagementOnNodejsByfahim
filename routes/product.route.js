const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");

/*
 to verify access all the router
router.use(verifyToken)
*/

// to upload single image
// router.post(
//   "/file-upload",
//   uploader.single("image"),
//   productController.fileUpload
// );

// to upload multiple images
router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router.route("/").get(productController.getProducts).post(
  verifyToken, //to verify access to single router
  authorization("admin", "store-manager"),
  productController.createProduct
);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
