const mongoose = require("mongoose");
const Movie = require("../models/movie");
const { body, validationResult } = require("express-validator");
const movie = require("../models/movie");
const capitalizeFirstLetter = require("../helper").capitalizeFirstLetter;

exports.movielist_get = (req, res, next) => {
	Movie.find({}).exec((err, results) => {
		if (err) {
			return next(err);
		}
		res.render("index", {
			title: "Highly Rated",
			movie_list: results,
		});
	});
};

// find list of movies
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

	body("category", "Must include Category")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("year", "Year must include year")
		.trim()
		.isLength({ min: 4, max: 4 })
		.isNumeric()
		.withMessage("Year must be 4 digit number")
		.escape(),
	body("summary", "Must include Summary")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	body("cover").trim().optional({ checkFalsy: true }),

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
			cover: req.body.cover,
		});

		//if errors, render page with error messages
		if (!errors.isEmpty()) {
			res.render("movie_add", {
				title: "Add Movie",
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

exports.movie_update_get = (req, res, next) => {
	Movie.findById(req.params.id).exec((err, results) => {
		if (err) {
			return next(err);
		}

		let currentMovie = {
			id: results.id,
			title: results.title,
			director: results.director,
			category: results.category,
			year_made: results.year_made,
			summary: results.summary,
			cover: results.cover,
		};

		res.render("movie_update", {
			movie: currentMovie,
		});
	});
};

exports.movie_update_post = [
	//first sanitize and validate
	body("title", "Must include title").trim().isLength({ min: 1 }).escape(),
	body("director", "Must include director")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	body("category", "Must include Category")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("year", "Year must include year")
		.trim()
		.isLength({ min: 4, max: 4 })
		.isNumeric()
		.withMessage("Year must be 4 digit number")
		.escape(),
	body("summary", "Must include Summary")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	body("cover").trim().optional({ checkFalsy: true }),

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
			cover: req.body.cover,
			_id: req.params.id,
		});

		//if errors, render page with error messages
		if (!errors.isEmpty()) {
			res.render("movie_update", {
				title: "Add Movie",
				errors: errors.array(),
				movie: movie,
			});
			return;
		}

		Movie.findByIdAndUpdate(req.params.id, movie, {}, (err, result) => {
			if (err) {
				return next(err);
			}
			res.redirect(result.url);
		});
	},
];

exports.movie_delete_get = (req, res, next) => {
	Movie.findById(req.params.id).exec((err, results) => {
		if (err) {
			return next(err);
		}

		let currentMovie = {
			id: results.id,
			title: results.title,
			director: results.director,
			category: results.category,
			year_made: results.year_made,
			summary: results.summary,
			cover: results.cover,
			url: results.url,
		};

		res.render("movie_delete", {
			movie: currentMovie,
		});
	});
};

exports.movie_delete_post = (req, res, next) => {
	Movie.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			return next(err);
		}

		res.redirect("/");
	});
};
