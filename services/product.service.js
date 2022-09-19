const Product = require("../models/Product");

exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);
  return products;
};

exports.createProductsService = async (data) => {
  //post can be in two ways: save or create
  //or create
  const product = await Product.create(data);
  // save
  // const product = new Product(data);

  //instance creation > Do something > save()

  // if (product.quantity == 0) {
  //   product.status = "out-of-stock";
  // }
  // const product = await product.save();
  return product;
};

exports.updateProductService = async (productId, data) => {
  //two ways to update: old & new;
  //new way;
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );

  //   old way;
  //   const product = await Product.findById(productId);
  //   const result = await product.set(data).save();

  return result;
};

exports.bulkUpdateProductService = async (data) => {
  //   const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //     runValidators: true,
  //   });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);

  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};
exports.bulkDeleteProductByIdService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
