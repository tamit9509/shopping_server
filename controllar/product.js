const productModel = require('../models/product');


exports.getAllProducts = (req, res) => {
	res.redirect('/', { prods: productModel.fetchAll() });
};

