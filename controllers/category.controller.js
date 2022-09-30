const {
  getCategoriesService,
  createCategoryService,
} = require("../services/category.service");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the categories",
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "Success",
      message: "category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the category",
      message: error.message,
    });
  }
};
