
const mongoose = require("mongoose");
const { Schema } = mongoose

const RatingSchema = new Schema({
	ISBN: String,
	"User-ID": {
		type: String,
		ref: "User"
	},
	ISBN: {
		type: String
	},
	"Book-Rating": String
},{collection:"ratings"})

module.exports = mongoose.model("Rating", RatingSchema);