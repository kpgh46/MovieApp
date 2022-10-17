exports.categoriesList_get = (req, res, next) => {
	res.render("categories_list", { title: "Movie Categories" });
};

exports.categories_movie_get = (req, res, next) => {
	let id = req.params.id;

	res.render("categories_movie", { title: id });
};
