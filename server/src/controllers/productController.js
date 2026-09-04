import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const brand = req.query.brand ? { brand: req.query.brand } : {};
  
  // Price filtering
  let priceFilter = {};
  if (req.query.minPrice || req.query.maxPrice) {
    priceFilter.price = {};
    if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
  }

  // Sorting
  let sortOrder = {};
  if (req.query.sort) {
    if (req.query.sort === 'lowest') sortOrder = { price: 1 };
    else if (req.query.sort === 'highest') sortOrder = { price: -1 };
    else if (req.query.sort === 'toprated') sortOrder = { rating: -1 };
    else if (req.query.sort === 'newest') sortOrder = { createdAt: -1 };
  } else {
    sortOrder = { createdAt: -1 };
  }

  const query = { ...keyword, ...category, ...brand, ...priceFilter };

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortOrder)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    success: true,
    data: {
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    }
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({ success: true, data: product });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    slug: 'sample-name-' + Date.now(),
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json({ success: true, data: createdProduct });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    discountPrice,
    isTrending,
    isFeatured
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.slug = name ? name.toLowerCase().replace(/ /g, '-') + '-' + Date.now() : product.slug;
    product.price = price !== undefined ? price : product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.isTrending = isTrending !== undefined ? isTrending : product.isTrending;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;

    const updatedProduct = await product.save();
    res.json({ success: true, data: updatedProduct });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ success: true, message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
