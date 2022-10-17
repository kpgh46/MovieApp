let capitalizeFirstLetter = require("../helper").capitalizeFirstLetter;
const mongoose = require("mongoose");
const Category = require("../models/genre");
const Movie = require("../models/movie");

exports.categoriesList_get = (req, res, next) => {
	res.render("categories_list", { title: "Movie Categories" });
};

exports.categories_movie_get = (req, res, next) => {
	let id = req.params.id;

	Movie.find({ category: id }).exec((err, result) => {
		if (err) {
			return next(err);
		}
		res.render("categories_movie", {
			title: capitalizeFirstLetter(id),
			movie_list: result,
		});
	});
};
