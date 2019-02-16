const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
	getAdminUsers(req, res) {
		User.find().exec((err, users) => {
			if (err) {
				console.log("Find Admin Users Error---------------", err);
				res.status(500).json({ error: err });
			}
			res.status(200).json({ users });
		});
	},

	createProduct(req, res) {
		//Destruct the values sent in from frontend from req.body
		const { name, description, price } = req.body;
		let newProduct = new Product({
			name,
			description,
			price
		});
		newProduct.save();
		res.status(200).json({ product: newProduct });
	},

	updateProduct(req, res) {
		const { id } = req.params;
		const { name, description, price } = req.body;
		Product.findById(id).exec((err, product) => {
			if (err) console.log("Updated Product-----------------", err);
			product.name = name;
			product.description = description;
			product.price = price;
			//Save the product with updated data.
			product.save();
			//THen send back the data, just for testing purposes.
			res.status(200).json({ product });
		});
	},

	deleteProduct(req, res) {
		//Destruct the id from the request params, since you have to delete a specific product.
		const { id } = req.params;
		Product.deleteOne({ _id: id }).exec((err, product) => {
			if (err) console.log("Delete One Error-----------------", err);
			res.status(200).json({ product });
		});
	}
};
