const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
	title: {
		type: String,
		required: true,
		maxLength: 200,
	},

	director: {
		first_name: String,
		last_name: String,
	},
	year_made: {
		type: String,
		maxLength: 4,
	},
	summary: {
		type: String,
	},
	watched: {
		type: Boolean,
	},
});

MovieSchema.virtual("url").get(function () {
	return `/${this._id}`;
});

module.exports = mongoose.model("Movie", MovieSchema);
