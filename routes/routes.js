const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff_controller');



router.post('/', staffController.createStaff);
router.get('/', staffController.getAllStaff);
router.delete('/:id', staffController.deleteStaffById);
router.put('/:id',staffController.updateStaffById);

module.exports = router;