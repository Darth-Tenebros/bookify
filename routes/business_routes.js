const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business_controller');

router.post('/add', businessController.createBusiness);
router.get('/', businessController.getAllBusiness);
router.get('/:id', businessController.getBusinessById);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);
router.delete('/all', businessController.deleteAllBusinesses);
router.put('/all', businessController.updateAllBusinesses);


module.exports = router;