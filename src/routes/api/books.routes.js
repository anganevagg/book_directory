const express = require("express")
const { default: mongoose } = require("mongoose")
const book = require("../../models/book")
const rating = require("../../models/rating")
const user = require("../../models/user")
const router = express.Router()

router.get("/", async (req, res) => {
	const books = await book.find({}).limit(100)
	res.json(books)
})

router.post("/search", async (req, res) => {
	const books = await book.find({
		"Book-Title": {
			$regex: req.body.title + ".*"
		}
	}).limit(100)
	res.json(books)
})

router.post("/filter", async (req, res) => {
	const books = await book.find({
		"Book-Title": {
			$regex: req.body.title + ".*"
		},
		"Book-Author": {
			$regex: req.body.author + ".*"
		},
		"ISBN": {
			$regex: req.body.ISBN + ".*"
		},
		"Year-Of-Publication": {
			$regex: req.body.year + ".*"
		},
		"Publisher": {
			$regex: req.body.publisher + ".*"
		}
	}).limit(100)
	res.json(books)
})

router.get("/:id", async (req, res) => {
	book.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(req.params.id)
			}
		},
		{
			$lookup: {
				from: "ratings",
				localField: "ISBN",
				foreignField: "ISBN",
				as: "ratings",
				pipeline: [
					{
						$lookup: {
							from: "users",
							localField: "User-ID",
							foreignField: "User-ID",
							as: "user"
						}
					}
				]
			},
		}
	])
		.then(data => res.json(data[0]))
})

router.post("/", async (req, res) => {
	if (
		req.body.isbn &&
		req.body.book_title &&
		req.body.book_author &&
		req.body.publisher &&
		req.body.img_s &&
		req.body.img_m &&
		req.body.img_l
	) {
		const newBook = {
			"ISBN": req.body.isbn,
			"Book-Title": req.body.book_title,
			"Book-Author": req.body.book_author,
			"Year-Of-Publication": req.body.year,
			"Publisher": req.body.publisher,
			"Image-URL-S": req.body.img_s,
			"Image-URL-M": req.body.img_m,
			"Image-URL-L": req.body.img_l,
		}
		const bookCreated = new book(newBook)
		const result = await bookCreated.save()
		res.json({
			message: "Created",
			id: result._id
		})
	}
	else {
		res.json({
			error: "Error in parameters"
		})
	}
})

router.put("/:id", async (req, res) => {
	if (
		req.body.isbn &&
		req.body.book_title &&
		req.body.book_author &&
		req.body.publisher &&
		req.body.img_s &&
		req.body.img_m &&
		req.body.img_l
	) {
		const updateBook = {
			"ISBN": req.body.isbn,
			"Book-Title": req.body.book_title,
			"Book-Author": req.body.book_author,
			"Year-Of-Publication": req.body.year,
			"Publisher": req.body.publisher,
			"Image-URL-S": req.body.img_s,
			"Image-URL-M": req.body.img_m,
			"Image-URL-L": req.body.img_l,
		}
		await book.findByIdAndUpdate({ _id: req.params.id }, updateBook)
		res.json({
			message: "Updated"
		})
	}
	else {
		res.json({
			error: "Error in parameters"
		})
	}
})

router.delete("/:id", async (req, res) => {
	const result = await rating.findByIdAndDelete({ _id: req.params.id })
	res.json({ message: "Deleted" })
})

module.exports = router