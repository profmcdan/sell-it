const Product = require("../models/product");

module.exports = {
	//Method used to read all the products.
	readAllProducts(req, res) {
		Product.find({}).exec((err, products) => {
			if (err) {
				console.log("Get Product Mongoose Error------------------", err);
				res.status(500).json({ error: err });
			}
			res.status(200).json({ products });
		});
	},

	readProduct(req, res) {
		const { id } = req.params;
		Product.findById(id).exec((err, product) => {
			if (err) {
				console.log("Get Single Product Error---------------", err);
				res.status(400).json({ error: err });
			}

			res.status(200).json({ product });
		});
	}
};
