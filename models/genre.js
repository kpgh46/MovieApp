let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GenreSchema = new Schema({
	name: {
		type: String,
		minLength: 2,
		maxLength: 100,
	},
});
