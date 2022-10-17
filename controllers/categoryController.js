let capitalizeFirstLetter = require("../helper").capitalizeFirstLetter;

exports.categoriesList_get = (req, res, next) => {
	res.render("categories_list", { title: "Movie Categories" });
};

exports.categories_movie_get = (req, res, next) => {
	let id = capitalizeFirstLetter(req.params.id);

	res.render("categories_movie", { title: id });
};
