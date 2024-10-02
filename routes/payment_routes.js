const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment_controller');


router.post('/payments/', paymentController.createPayment);

//adjust this [the /all/ paths]
router.get('/payments/all/', paymentController.getAllPayments);

router.get('/payments/:id', paymentController.getPaymentById);

router.delete('/payments/all/', paymentController.deleteAllPayments);

router.delete('/payments/:id', paymentController.deletePaymentById);

router.put('/payments/:id', paymentController.updatePaymentById);

module.exports = router;