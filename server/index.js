require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const adminController = require("./controllers/admin_controller");
const cloudinaryController = require("./controllers/cloudinary_controller");
const userController = require("./controllers/user_controller");
const productsController = require("./controllers/products_controller");

const app = express();
const PORT = 5000;

mongoose
	.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
	.then(() => {
		console.log("Database Connected");
	})
	.catch((err) => {
		console.log("Cannot connect to the database: " + err);
	});

app.use(bodyParser.json());
app.use(cors());

app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 14 }
	})
);

setTimeout(() => {
	//All our endpoints.
	//Read the user's session.
	// app.get("/api/user-data", userController.readUserData);
	//Add a item to cart.
	// app.post("/api/user-data/cart", userController.addToCart);
	//Remove a item from the cart.
	// Use request parameter to remove item from cart since you are looking a specific item in cart.
	// app.delete("/api/user-data/cart/:id", userController.removeFromCart);
	//When user login
	// app.post("/api/login", userController.login);
	//NO NEED FOR A REGISTER SINCE YOUR ARE USING AUTH0.
	//Just need a login, since you are logging from your social media provider no need to register, only looks if a user already has a account.
	//When the user logouts
	// app.post("/api/logout", userController.logout);
	//Products Endpoints
	//Getting all the products
	app.get("/api/products", productsController.readAllProducts);
	//Getting a specified product
	//Use a request parameter, since retrieving a specified product..
	app.get("/api/products/:id", productsController.readProduct);
	//Admin Endpoints
	//Gets the admin users.
	app.get("/api/users", adminController.getAdminUsers);
	//When a admin creates a product. No need for request parameter in this case. Since we are inserting data to database.
	app.post("/api/products", adminController.createProduct);
	//When a admin update a current product. Need request parameter since updating a specific product based on  the id.
	app.put("/api/products/:id", adminController.updateProduct);
	//When a admin deletes a product, need an id to specify a product to delete.
	app.delete("/api/products/:id", adminController.deleteProduct);
}, 200);

app.listen(PORT, () => console.log("Listening on Port:", PORT));
