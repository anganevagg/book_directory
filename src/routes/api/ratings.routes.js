const express = require("express")
const rating = require("../../models/rating")
const router = express.Router()

router.get("/", async (req, res) => {
	const ratings = await rating.find({}).limit(100)
	res.json(ratings)
})

router.get("/:id", async (req, res) => {
	const ratings = await rating.find({ _id: req.params.id })
	res.json(ratings)
})

router.post("/", async (req, res) => {
	if (
		req.body.user_id && 
		req.body.isbn && 
		req.body.book_rating
	) {
		const newRating = {
			"User-ID": req.body.user_id,
			"ISBN": req.body.isbn,
			"Book-Rating": req.body.book_rating
		}
		const ratingCreated = new rating(newRating)
		const result = await ratingCreated.save()
		res.json({
			message: "Created",
			id: result._id
		})
	}
	else{
		res.json({
			error: "Error in parameters"
		})
	}
})

router.put("/:id", async (req, res) => {
	if (
		req.body.user_id &&
		req.body.isbn &&
		req.body.book_rating
	){
		const newRating = {
			"User-ID": req.body.user_id,
			"ISBN": req.body.isbn,
			"Book-Rating": req.body.book_rating
		}
		const result = await rating.findByIdAndUpdate({ _id: req.params.id }, newRating)
		res.json({
			message: "Updated"
		})
	}
	else{
		res.json({
			message: "Error in parameters"
		})
	}
})

router.delete("/:id", async (req, res) => {
	const result = await rating.findByIdAndDelete({ _id: req.params.id })
	res.json({message: "Deleted"})
})

module.exports = router