const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./../util/path');
const products = require('./admin').products;
const shopControllar = require('../controllar/shop');
const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/product', shopControllar.getAllProducts);
router.get('/', shopControllar.getIndex);
router.post('/cart/:id', bodyParser.json(), shopControllar.addTOCart);
router.get('/cart', shopControllar.getCart);
router.get('/product/:id', shopControllar.getProductDetails);
router.get('/orders', shopControllar.getOrders);
router.get('/checkout', shopControllar.getCheckout);

module.exports = router;
