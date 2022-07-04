const mongoose = require("mongoose");
const { Schema } = mongoose

const BookSchema = new Schema({
	ISBN: String,
	"Book-Title": String,
	"Book-Author": String,
	"Year-Of-Publication": String,
	Publisher: String,
	"Image-URL-S": String,
	"Image-URL-M": String,
	"Image-URL-L": String
}, { collection: "books" })

module.exports = mongoose.model("Book", BookSchema);