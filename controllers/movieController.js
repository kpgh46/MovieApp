const mongoose = require("mongoose");
const Movie = require("../models/movie");

exports.movieList = (req, res, next) => {
	Movie.find({}).exec((err, results) => {
		if (err) {
			return next(err);
		}
		res.render("index", {
			title: "List of Movies",
			movie_list: results,
		});
	});
};

exports.movieDetail = (req, res, next) => {
	let id = req.params.id;

	Movie.findById(id).exec((err, results) => {
		if (err) {
			return next(err);
		}

		res.render("movie_detail", {
			movie_detail: results,
		});
	});
};

exports.MovieAdd = (req, res, next) => {
	res.render("movie_add", {
		title: "Add New Movie",
	});
};
