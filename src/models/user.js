const mongoose = require("mongoose");
const { Schema } = mongoose

const UserSchema = new Schema({
	"User-id": String,
	Location: String,
	Age: String
},{collection:"users"})

module.exports = mongoose.model("User", UserSchema);