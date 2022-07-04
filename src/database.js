const mongoose = require('mongoose')
const db = require('./config/keys').mogodbURI

mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology:true })
	.then(()=>{
		console.log('db is connected')
	})
	.catch(err=>{
		console.error(err)
	})

module.exports = mongoose