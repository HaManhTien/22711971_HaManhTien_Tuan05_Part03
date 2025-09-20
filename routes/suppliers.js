const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Danh sách
router.get('/', supplierController.getAllSuppliers);

// Form thêm
router.get('/add', supplierController.showForm);
router.post('/add', supplierController.saveSupplier);

// Form sửa
router.get('/edit/:id', supplierController.showForm);
router.post('/edit/:id', supplierController.saveSupplier);

// Xóa
router.post('/delete/:id', supplierController.deleteSupplier);

module.exports = router;
