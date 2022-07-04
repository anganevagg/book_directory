const express = require("express")
const morgan = require("morgan")
const server = express()
const path = require("path")

server.use(morgan("dev"))
server.use(express.json())

require("./database")


server.use(express.static(path.join(__dirname, "public")))
console.log(path.join(__dirname, "..", "node_modules/bootstrap/dist/css"))
server.use("/api", require("./routes/router"))
server.use('/css', express.static('node_modules/bootstrap/dist/css'))
server.use('/js', express.static('node_modules/bootstrap/dist/js'))

module.exports = server