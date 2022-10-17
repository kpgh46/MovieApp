const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
	title: {
		type: String,
		required: true,
		maxLength: 200,
	},

	director: {
		type: String,
	},
	category: {
		type: String,
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
	cover: {
		type: String,
	},
});

MovieSchema.virtual("url").get(function () {
	return `/detail/${this._id}`;
});

module.exports = mongoose.model("Movie", MovieSchema);
