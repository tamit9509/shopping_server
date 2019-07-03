const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const adminControllar = require('../controllar/admin');
const bodyParser = require('body-parser');
const router = express();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/add-product', adminControllar.addProduct);
router.post('/product', bodyParser.json(), adminControllar.postProduct);
router.get('/product', adminControllar.getProducts);
router.put('/product/:id', bodyParser.json(), adminControllar.updateProduct);
router.get('/edit-product/:id', adminControllar.editProduct);
router.delete('/product/:id', adminControllar.deleteProduct);

module.exports = router;
