const mongoose = require('mongoose');
const Product = require('../models/Product');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.getAll = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ message: 'Invalid product ID' });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const [totalProducts, categories, valueAgg] = await Promise.all([
      Product.countDocuments(),
      Product.distinct('category'),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
            totalItems: { $sum: '$quantity' },
            avgPrice: { $avg: '$price' },
          },
        },
      ]),
    ]);

    const stats = valueAgg[0] || { totalValue: 0, totalItems: 0, avgPrice: 0 };

    res.json({
      totalProducts,
      totalCategories: categories.length,
      totalValue: stats.totalValue,
      totalItems: stats.totalItems,
      avgPrice: stats.avgPrice,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories.sort());
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ message: 'Invalid product ID' });

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ message: 'Invalid product ID' });

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
