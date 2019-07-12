const _ = require('lodash');
const productModel = require('../models/product');
const cart = require('../models/cart');

exports.getAllProducts = (req, res) => {
	productModel.fetchAll((products) => {
		// res.render('shop/product-list', {
		// 	prods: products,
		// 	hasLength: products.length > 0,
		// 	pageTitle: 'All Products',
		// 	path: '/products'
		// });
		res.send({
			data: {
				items: products
			},
			message: 'action successfull',
			statusCode: 200
		});
	});
};

exports.getIndex = (req, res) => {
	productModel.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			hasLength: products.length > 0,
			pageTitle: 'Shop',
			path: '/'
		});
	});
};

exports.getCart = (req, res, next) => {
	// res.render('shop/cart', {
	// 	pageTitle: 'Cart',
	// 	path: '/cart'
	// });
	cart.getCart((obj) => {
		res.send({
			data: {
				items: obj
			},
			messasge: 'successfull',
			statusCode: 200
		});
	});
};

exports.addTOCart = (req, res, next) => {
	const productId = req.params.id;
	const price = Number(req.body.price);
	cart.addProduct(productId, price, () => {
		res.send({
			message: 'action successfull'
		});
	});
};
exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Orders',
		path: '/orders'
	});
};
exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout'
	});
};
exports.getProductDetails = (req, res, next) => {
	const productId = req.params.id;
	productModel.findById(productId, (product) => {
		// res.render('shop/product-details', {
		// 	prod: product,
		// 	path: 'products/:id',
		// 	pageTitle: product.title
		// })
		res.send({
			data: product,
			message: 'action successfull',
			statusCode: 200
		});
	});
};
