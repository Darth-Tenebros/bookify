const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business_controller');

router.post('/businesses/', businessController.createBusiness);

router.get('/businesses/all/', businessController.getAllBusinesses);

router.get('/businesses/:id', businessController.getBusinessById);

router.put('/businesses/:id', businessController.updateBusinessById);

router.delete('/businesses/:id', businessController.deleteBusinessById);

router.delete('/businesses/all/', businessController.deleteAllBusinesses);

module.exports = router;
