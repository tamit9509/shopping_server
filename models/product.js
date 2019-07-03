const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'product.json');

const getContentFromFile = (callback) => {
	fs.readFile(p, (err, fileContent) => {
		if (!err) {
			callback(JSON.parse(fileContent));
		}
	});
};

module.exports = class Product {
	constructor(obj) {
		this.title = obj.title;
		this.price = obj.price;
		this.imageUrl = obj.imageUrl;
		this.description = obj.description;
	}

	save(callback) {
		this.id = Math.random().toString();
		getContentFromFile((products) => {
			let product = [];
			product = products;
			product.push(this);
			fs.writeFile(p, JSON.stringify(product), (err) => {});
		});
	}

	static fetchAll(callback) {
		getContentFromFile(callback);
	}

	static findById(id, callback) {
		getContentFromFile((products) => {
			const product = products.find((product) => {
				return product.id === id;
			});
			callback(product);
		});
	}

	updateProduct(productId, callback) {
		console.log('zdfvz');

		this.id = productId;
		getContentFromFile((products) => {
			const index = products.findIndex((obj) => {
				return obj.id === productId;
			});
			products.splice(index, 1);
			const obj = products.splice(index, 0, this);
			fs.writeFile(p, JSON.stringify(products), (err) => {});
			console.log(obj);
			if (obj) {
				callback(obj);
			}
			callback(null);
		});
	}
	static deleteProduct(productId, callback) {
		getContentFromFile((products) => {
			const index = products.findIndex((obj) => {
				obj.id === productId;
			});
			const obj = products.splice(index, 0);
			fs.writeFile(p, JSON.stringify(products), (err) => {});
			console.log(obj);

			callback(obj);
		});
	}
};
