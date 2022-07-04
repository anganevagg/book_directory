const express = require("express")
const router = express.Router()

router.use("/books", require("./api/books.routes"))
router.use("/users", require("./api/users.routes"))
router.use("/ratings", require("./api/ratings.routes"))

module.exports = router