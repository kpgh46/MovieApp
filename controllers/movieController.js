const mongoose = require("mongoose");
const Movie = require("../models/movie");
const { body, validationResult } = require("express-validator");

exports.movielist_get = (req, res, next) => {
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

exports.movieDetail_get = (req, res, next) => {
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

exports.movie_create_get = (req, res, next) => {
	res.render("movie_add", {
		title: "Add New Movie",
	});
};

exports.movie_create_post = [
	body("title", "Must include title").trim().isLength({ min: 1 }).escape(),
	body("director", "must include director")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("year", "Must include year")
		.trim()
		.isLength({ min: 4, max: 4 })
		.isNumeric()
		.withMessage("Must be 4 digit number")
		.escape(),
	body("summary", "Please include Summary")
		.trim()
		.isLength({ max: 300 })
		.escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		let movie = new Movie({
			title: req.body.title,
			director: req.body.director,
			year_made: req.body.year,
			summary: req.body.summary,
		});

		if (!errors.isEmpty()) {
			res.render("movie_add", {
				title: "Add Author",
				errors: errors.array(),
			});
			return;
		}

		movie.save((err) => {
			if (err) {
				return next(err);
			}
			res.redirect(book.url);
		});
	},
];
