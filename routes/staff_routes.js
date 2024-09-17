const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff_controller');

router.post('/staff/', staffController.createStaff);

router.get('/staff/all/', staffController.getAllStaff);

router.get('/staff/:id', staffController.getStaffById);

router.put('/staff/:id', staffController.updateStaffById);

router.delete('/staff/:id', staffController.deleteStaffById);

router.delete('/staff/all/', staffController.deleteAllStaff);

module.exports = router;
