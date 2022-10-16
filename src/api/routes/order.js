const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrder);

router.get("/:orderId", orderController.getOrder);

router.patch("/:orderId", orderController.updateOrder);

router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;