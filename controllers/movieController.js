const mongoose = require("mongoose");
const Movie = require("../models/movie");

exports.testFunction = (req, res, next) => {
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

// exports.book_list = (req, res, next) => {
// 	Book.find({}, "title author")
// 		.sort({ title: 1 })
// 		.populate("author")
// 		.exec((err, list_books) => {
// 			if (err) {
// 				return next(err);
// 			}
// 			res.render("book_list", {
// 				title: "Book list",
// 				book_list: list_books,
// 			});
// 		});
// };
