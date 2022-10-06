const {
  getStocksService,
  createStockService,
  updateStockServiceById,
} = require("../services/stock.service");

exports.getStocks = async (req, res, next) => {
  try {
    const brand = await getStocksService(req.body);

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the brand",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  //post can be in two ways: save or create
  try {
    //or create
    const result = await createStockService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Brand created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
      message: error.message,
    });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getStockServiceById(id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find the brand",
      });
    }

    res.status(200).json({
      status: "Success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't find the brand",
      error: error.message,
    });
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateStockServiceById(id, req.body);

    console.log(result);

    if (!result.nModified) {
      return res.status(400).json({
        status: "Success",
        error: "Couldn't updated the brand with id",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "brand updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the brand",
      error: error.message,
    });
  }
};
