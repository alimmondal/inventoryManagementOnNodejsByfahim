const Stock = require("../models/Stock");

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(totalStocks / queries.limit);
  return { total, page, stocks };
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStockByIdService = async (id) => {
  const stock = await Stock.findOne({ _id: id }).populate("store.id");
  return stock;
};

exports.updateStockByIdService = async (stockId, data) => {
  const result = await Stock.updateOne(
    { _id: stockId },
    { $inc: data },
    {
      runValidators: true,
    }
  );

  // const stock = await Product.findById(stockId);
  // const result = await product.set(data).save();
  return result;
};

exports.deleteStockByIdService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};

// exports.bulkUpdateProductService = async (data) => {
// console.log(data.ids,data.data)
// const result = await Product.updateMany({ _id: data.ids }, data.data, {
//     runValidators: true
// });

//   const products = [];

//   data.ids.forEach((product) => {
//     products.push(Product.updateOne({ _id: product.id }, product.data));
//   });

//   const result = await Promise.all(products);
//   console.log(result);

//   return result;
// };

// exports.bulkDeleteProductService = async (ids) => {
//   const result = await Product.deleteMany({ _id: ids });

//   return result;
// };
