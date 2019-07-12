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
		console.log(this);

		this.id = Math.random().toString();
		getContentFromFile(async (products) => {
			let product = [];
			product = products;
			product.push(this);
			await fs.writeFile(p, JSON.stringify(product), (err) => { });
			callback(this);
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
		this.id = productId;
		getContentFromFile((products) => {
			const index = products.findIndex((obj) => {
				return obj.id === productId;
			});
			products.splice(index, 1);
			const obj = products.splice(index, 0, this);
			fs.writeFile(p, JSON.stringify(products), (err) => { });
			if (obj) {
				callback(obj);
			}
			callback(null);
		});
	}
	static deleteProduct(productId, callback) {
		getContentFromFile((products) => {
			const index = products.findIndex((obj) => {
				return obj.id === productId;
			});
			const obj = products.splice(index, 1);
			fs.writeFile(p, JSON.stringify(products), (err) => { });
			callback(obj[0]);
		});
	}
};
