const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Hiển thị danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const products = await Product.find().populate('supplier');

    const searchQuery = req.query.search || '';
    const selectedSupplier = req.query.supplier || '';

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

    res.render('products/index', {
      products: filteredProducts,
      suppliers,
      searchQuery,
      selectedSupplier
    });
  } catch (err) {
    res.send(err.message);
  }
};

// Form thêm/sửa
exports.showForm = async (req, res) => {
  try {
    let product = {};
    const suppliers = await Supplier.find();
    if (req.params.id) {
      product = await Product.findById(req.params.id);
    }
    res.render('products/form', { product, suppliers });
  } catch (err) {
    res.send(err.message);
  }
};

// Thêm/sửa sản phẩm
exports.saveProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    if (req.params.id) {
      await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    } else {
      const product = new Product({ name, price, quantity, supplier });
      await product.save();
    }
    res.redirect('/products');
  } catch (err) {
    res.send(err.message);
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.send(err.message);
  }
};
