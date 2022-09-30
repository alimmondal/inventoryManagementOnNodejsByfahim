const {
  createBrandService,
  getBrandsService,
  getBrandServiceById,
  updateBandServiceById,
} = require("../services/brand.service");

exports.getBrands = async (req, res, next) => {
  try {
    const brand = await getBrandsService(req.body);

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

exports.createBrand = async (req, res, next) => {
  //post can be in two ways: save or create
  try {
    //or create
    const result = await createBrandService(req.body);

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

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandServiceById(id);

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

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateBandServiceById(id, req.body);

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
