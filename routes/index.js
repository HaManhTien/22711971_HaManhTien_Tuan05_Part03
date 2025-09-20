const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const products = await Product.find().populate('supplier');

    const searchQuery = req.query.search || '';
    const selectedSupplier = req.query.supplier || '';

    // Lọc sản phẩm theo searchQuery và supplier
    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedSupplier) {
      filteredProducts = filteredProducts.filter(p =>
        p.supplier._id.toString() === selectedSupplier
      );
    }

    res.render('index', {
      products: filteredProducts,
      suppliers,
      searchQuery,
      selectedSupplier
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
