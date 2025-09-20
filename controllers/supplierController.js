const Supplier = require('../models/Supplier');

// Hiển thị danh sách nhà cung cấp
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
  } catch (err) {
    res.send(err.message);
  }
};

// Hiển thị form thêm/sửa
exports.showForm = async (req, res) => {
  try {
    let supplier = {};
    if (req.params.id) {
      supplier = await Supplier.findById(req.params.id);
    }
    res.render('suppliers/form', { supplier });
  } catch (err) {
    res.send(err.message);
  }
};

// Xử lý thêm/sửa nhà cung cấp
exports.saveSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    if (req.params.id) {
      // Sửa
      await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    } else {
      // Thêm
      const supplier = new Supplier({ name, address, phone });
      await supplier.save();
    }
    res.redirect('/suppliers');
  } catch (err) {
    res.send(err.message);
  }
};

// Xóa nhà cung cấp
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    res.send(err.message);
  }
};
