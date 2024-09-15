const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business_controller');

router.post('/add', businessController.createBusiness);
router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.put('/:id', businessController.updateBusinessById);
router.delete('/:id', businessController.deleteBusinessById);
router.delete('/all', businessController.deleteAllBusinesses);
// router.put('/all', businessController.);


module.exports = router;