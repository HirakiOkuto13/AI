const express = require('express');
const router = express.Router();
const adpController = require('../controllers/adp');

// path
// แสดงสินค้าทั้งหมด
router.get('/adp', adpController.getAllAdp);

// เพิ่มสินค้า
router.post('/add-adp', adpController.addAdp);

// แสดงสินค้าจากไอดี
router.get('/edit-adp/:id', adpController.getEditAdp);

// แก้ไขสินค้า
router.post('/edit-adp', adpController.editAdp);

// ลบสินค้า
router.get('/delete-adp', adpController.deleteAdp)

module.exports = router;