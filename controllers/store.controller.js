const {
  getStoresService,
  createStoreService,
  getStorServiceById,
} = require("../services/store.service");

exports.getStores = async (req, res, next) => {
  try {
    const stores = await getStoresService();

    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the stores",
      error: error.message,
    });
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Store created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the store",
      message: error.message,
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStorServiceById(id);

    res.status(200).json({
      status: "Success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't get the store",
      error: error.message,
    });
  }
};
