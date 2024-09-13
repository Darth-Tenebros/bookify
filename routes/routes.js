const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff_controllers');



router.post('/', staffController.createStaff);
router.get('/', staffController.getAllStaff);
router.delete('/:id',staffController.deleteStaff);
router.put('/:id',staffController.UpdateStaff);

module.exports = router;