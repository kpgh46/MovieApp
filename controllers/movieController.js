const mongoose = require("mongoose");
const Movie = require("../models/movie");
const { body, validationResult } = require("express-validator");
const capitalizeFirstLetter = require("../helper").capitalizeFirstLetter;

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

		results.category = capitalizeFirstLetter(results.category);
		results.director = capitalizeFirstLetter(results.director);

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
	//first sanitize and validate
	body("title", "Must include title").trim().isLength({ min: 1 }).escape(),
	body("director", "Must include director")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	body("category").trim().isLength({ min: 1 }).escape(),
	body("year", "Year must include year")
		.trim()
		.isLength({ min: 4, max: 4 })
		.isNumeric()
		.withMessage("Year must be 4 digit number")
		.escape(),
	body("summary", "Please include Summary")
		.trim()
		.isLength({ max: 300 })
		.escape(),

	(req, res, next) => {
		//grab the errors with built in validation
		const errors = validationResult(req);

		//create object from Movie model
		let movie = new Movie({
			title: req.body.title,
			director: req.body.director,
			category: req.body.category,
			year_made: req.body.year,
			summary: req.body.summary,
		});

		//if errors, render page with error messages
		if (!errors.isEmpty()) {
			res.render("movie_add", {
				title: "Add Author",
				errors: errors.array(),
				movie: movie,
			});
			return;
		}
		//if no errors, save to database and render new movie detail page
		movie.save((err) => {
			if (err) {
				return next(err);
			}
			res.redirect(movie.url);
		});
	},
];
