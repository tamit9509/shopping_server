const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const getFileContent = (p, callback) => {
	fs.readFile(p, (err, fileContent) => {
		if (!err) {
			cart = JSON.parse(fileContent);
			callback(cart);
		}
	});
};
module.exports = class Cart {
	static addProduct(id, totalPrice, callback) {
		let cart = { products: [], totalPrice: 0 };
		const p = path.join(rootDir, 'data', 'cart.json');
		//Read all profucts from cart
		getFileContent(p, (cart) => {
			const existingProductIndex = cart.products.findIndex((product) => {
				return product.id === id;
			});
			let updatedProduct;
			if (existingProductIndex >= 0) {
				updatedProduct = { ...cart.products[existingProductIndex] };
				updatedProduct.qty += 1;
				cart.products.splice(existingProductIndex, 1);
				cart.products.splice(existingProductIndex, 0, updatedProduct);
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products.push(updatedProduct);
			}
			cart.totalPrice += parseFloat(totalPrice);
			fs.writeFile(p, JSON.stringify(cart), (err) => {});
			callback();
		});
	}
	static getCart(callback) {
		let p = path.join(rootDir, 'data', 'cart.json');
		let cartProducts = [];
		const cartData = [];
		getFileContent(p, (cart) => {
			cartProducts = [...cart.products];
			getFileContent(path.join(rootDir, 'data', 'product.json'), (products) => {
				cartProducts.forEach((obj) => {
					cartData.push(
						products.find((o) => {
							if (obj.id === o.id) {
								o.qty = obj.qty;
								return true;
							}
							return false;
						})
					);
				});
				_.remove(cartData, (obj) => {
					return !obj;
				});
				callback(cartData);
			});
		});
	}
};
