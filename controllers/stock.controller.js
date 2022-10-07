const {
  getStocksService,
  createStockService,
  updateStockByIdService,
  deleteStockByIdService,
} = require("../services/stock.service");

exports.getStocks = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    // /stock?sortBy=price&price=5000name=chal&location=dhaka

    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getStocksService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  try {
    // save or create
    const result = await createStockService(req.body);

    res.status(200).json({
      status: "success",
      message: "Stock inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);

    if (!stock) {
      return res.status(200).json({
        status: "Success",
        message: "Couldn't get the stock",
      });
    }

    res.status(200).json({
      status: "Success",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the stock",
      error: error.message,
    });
  }
};
exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteStockByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

//   exports.bulkUpdateProduct = async (req, res, next) => {
//     try {
//       console.log(req.body);
//       const result = await bulkUpdateProductService(req.body);

//       res.status(200).json({
//         stauts: "success",
//         message: "Successfully updated the product",
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         message: "Couldn't update the product",
//         error: error.message,
//       });
//     }
//   };

//   exports.bulkDeleteProduct = async (req, res, next) => {
//     try {
//       console.log(req.body);
//       const result = await bulkDeleteProductService(req.body.ids);

//       res.status(200).json({
//         stauts: "success",
//         message: "Successfully deleted the given products",
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         message: "Couldn't delete the given products",
//         error: error.message,
//       });
//     }
//   };

//   exports.fileUpload = async (req, res, next) => {
//     try {
//       // to upload single image, use only file
//       // res.status(200).json(req.file);

//       // to upload multiple images, use files
//       res.status(200).json(req.files);
//     } catch (error) {
//       res.status(400).json(req.file);
//     }
//   };
