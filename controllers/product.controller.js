const Product = require("../models/Product");
const {
  getProductsService,
  createProductsService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductByIdService,
} = require("../services/product.service");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    //sort, page, limit > exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt,lt,gte,lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity > 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    const products = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  //post can be in two ways: save or create
  try {
    //or create
    const result = await createProductsService(req.body);
    result.logger();

    res.status(200).json({
      status: "Success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data inserted failed",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Products delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't delete the product",
      error: error.message,
    });
  }
};
