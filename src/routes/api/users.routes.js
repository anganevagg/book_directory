const express = require("express")
const user = require("../../models/user")
const router = express.Router()

router.get("/", async(req, res)=>{
	const users = await user.find({}).limit(100)
	res.json(users)
})

router.get("/:id", async(req, res)=>{
	const users = await user.find({_id:req.params.id})
	res.json(users)
})

router.post("/", async(req, res)=>{
	if(
		req.body.user_id&&
		req.body.location&&
		req.body.age
	){
		const newUser = {
			"User-ID": req.body.user_id,
			"Location": req.body.location,
			Age: req.body.age
		}
		const userCreated = new user(newUser)
		await userCreated.save()
		res.json({
			message: "Created",
			id: userCreated._id
		})
	}
	else{
		res.json({
			error: "Error in parameters"
		})
	}
})

router.put("/:id", async(req, res)=>{
	if(
		req.body.user_id&&
		req.body.location&&
		req.body.age
	){
		const newUser = {
			"User-ID": req.body.user_id,
			"Location": req.body.location,
			Age: req.body.age
		}
		const userUpdated = await user.findByIdAndUpdate({_id: req.params.id}, newUser)
		res.json({
			message: "Updated"
		})
	}
	else{
		res.json({
			error: "Error in parameters"
		})
	}
})

router.delete("/:id", async(req, res)=>{
	const result = await user.findByIdAndDelete({_id: req.params.id})
	res.json({
		message: "Deleted"
	})
})

module.exports = router