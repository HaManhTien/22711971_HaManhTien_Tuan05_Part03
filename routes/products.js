const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const authMiddleware = require('../middleware/auth'); // kiểm tra login

// Danh sách sản phẩm
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().populate('supplier'); // lấy nhà cung cấp
    res.render('products/index', {
      products,
      title: 'Danh sách sản phẩm' // truyền title để header dùng
    });
  } catch (err) {
    console.log(err);
    res.send('Lỗi server');
  }
});

// Form thêm/sửa sản phẩm
router.get('/form/:id?', authMiddleware, async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    let product = null;
    if (req.params.id) {
      product = await Product.findById(req.params.id);
    }
    res.render('products/form', {
      product,
      suppliers,
      title: product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'
    });
  } catch (err) {
    console.log(err);
    res.send('Lỗi server');
  }
});

// Xử lý thêm sản phẩm
router.post('/form', authMiddleware, async (req, res) => {
  try {
    const { id, name, price, quantity, supplierId } = req.body;
    if (id) {
      // Update
      await Product.findByIdAndUpdate(id, { name, price, quantity, supplier: supplierId });
    } else {
      // Create
      const product = new Product({ name, price, quantity, supplier: supplierId });
      await product.save();
    }
    res.redirect('/products');
  } catch (err) {
    console.log(err);
    res.send('Lỗi server');
  }
});

// Xóa sản phẩm
router.get('/delete/:id', authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.log(err);
    res.send('Lỗi server');
  }
});

module.exports = router;
