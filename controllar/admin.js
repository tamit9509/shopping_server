const productModel = require('../models/product');

exports.addProduct = (req, res) => {
	// res.render('admin/addproduct', {
	//   path: 'admin/add-product',
	//   pageTitle: 'Add Product'
	// });
	const product = new productModel(req.body);

	product.save((obj) => {
		res.send({
			data: obj,
			message: 'action successfull',
			statusCode: 200
		});
	});
};

exports.editProduct = (req, res) => {
	const productId = req.params.id;
	productModel.findById(productId, (product) => {
		// res.render('admin/edit-product', {
		//   path: 'admin/edit-product/:id',
		//   pageTitle: 'Edit Product',
		//   product: product
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

exports.updateProduct = (req, res) => {
	const productId = req.params.id;
	const product = new productModel(req.body);
	product.updateProduct(productId, (obj) => {
		if (obj) {
			res.send({
				data: obj,
				message: 'successfully updated',
				statusCode: 200
			});
		}
	});
};

exports.deleteProduct = (req, res) => {
	console.log('ascxmlascm');

	const productId = req.params.id;
	productModel.deleteProduct(productId, (obj) => {
		if (obj) {
			res.send({
				data: obj,
				message: 'successfully deleted',
				statusCode: 200
			});
		}
	});
};
exports.postProduct = (req, res) => {
	if (req.body) {
		const product = new productModel(req.body);

		product.save();
	}
	res.redirect('/');
};

exports.getProducts = (req, res) => {
	productModel.fetchAll((products) => {
		// res.render('admin/product', {
		//   prods: products,
		//   path: 'admin/products',
		//   pageTitle: 'Admin Products',
		//   hasLength: products.length > 0
		// })
		res.send({
			data: {
				items: products
			},
			message: 'action successfull',
			statusCode: 200
		});
	});
};
