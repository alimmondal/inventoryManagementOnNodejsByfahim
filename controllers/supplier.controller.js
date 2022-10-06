const {
  createSupplierService,
  getSuppliersService,
  getSupplierServiceById,
  updateSupplierServiceById,
} = require("../services/supolier.service");

exports.createSupplier = async (req, res) => {
  //post can be in two ways: save or create
  try {
    //or create
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Supplier created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the Supplier",
      message: error.message,
    });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const supplier = await getSuppliersService(req.body);

    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the supplier",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierServiceById(id);

    if (!supplier) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find the supplier",
      });
    }

    res.status(200).json({
      status: "Success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't find the supplier",
      error: error.message,
    });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateSupplierServiceById(id, req.body);

    // console.log(result);

    if (!result.nModified) {
      return res.status(400).json({
        status: "Success",
        error: "Couldn't updated the supplier with id",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "supplier updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the supplier",
      error: error.message,
    });
  }
};
