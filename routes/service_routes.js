const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service_controller');

router.post('/services/', serviceController.createService);

router.get('/services/all/', serviceController.getAllServices);

router.get('/services/:id', serviceController.getServiceById);

router.put('/services/:id', serviceController.updateServiceById);

router.delete('/services/:id', serviceController.deleteServiceById);

router.delete('/services/all/', serviceController.deleteAllServices);

module.exports = router;
