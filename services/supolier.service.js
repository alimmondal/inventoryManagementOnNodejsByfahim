const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  //post can be in two ways: save or create
  //or create
  const result = await Supplier.create(data);
  // save
  // const result = new Product(data);

  //instance creation > Do something > save()

  // if (result.quantity == 0) {
  //   result.status = "out-of-stock";
  // }
  // const result = await product.save();
  return result;
};
exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({});
  // .sort(queries.sortBy);
  return suppliers;
};
exports.getSupplierServiceById = async (id) => {
  const suppliers = await Supplier.findOne({ _id: id });
  return suppliers;
};

exports.updateSupplierServiceById = async (id, data) => {
  //two ways to update: old & new;
  //new way;
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  //   old way;
  //   const brand = await Brand.findById(id);
  //   const brand = await Brand.set(data).save();

  return result;
};
