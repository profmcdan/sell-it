const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
	//THis is where the user will login
	//For Now we will be inserting test data
	name: String,
	email: String,
	username: String,
	auth0_id: String
});

module.exports = mongoose.model("User", user);
