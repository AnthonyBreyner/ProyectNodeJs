const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HoursSchema=Schema({
	currenttime:{type: Date, default: Date.now()},
	entrytime: {type: String},
	departuretime:{type: String},
	horapref:{type: Number},
	description: String,
	userid: String,
	name: String
})
module.exports=mongoose.model('Hours', HoursSchema)