const Brand = require("../models/Brand");

exports.getBrandsService = async () => {
  const brands = await Brand.find({}).select("-products -suppliers");
  // .sort(queries.sortBy);
  return brands;
};
exports.getBrandServiceById = async (id) => {
  const brands = await Brand.findOne({ _id: id });
  return brands;
};

exports.createBrandService = async (data) => {
  //post can be in two ways: save or create
  //or create
  const result = await Brand.create(data);
  // save
  // const result = new Product(data);

  //instance creation > Do something > save()

  // if (result.quantity == 0) {
  //   result.status = "out-of-stock";
  // }
  // const result = await product.save();
  return result;
};

exports.updateBandServiceById = async (id, data) => {
  //two ways to update: old & new;
  //new way;
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  //   old way;
  //   const brand = await Brand.findById(id);
  //   const brand = await Brand.set(data).save();

  return result;
};

// exports.deleteProductByIdService = async (id) => {
//   const result = await Product.deleteOne({ _id: id });

//   return result;
// };
// exports.bulkDeleteProductByIdService = async (ids) => {
//   const result = await Product.deleteMany({ _id: ids });

//   return result;
// };
