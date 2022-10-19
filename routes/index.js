var express = require("express");
var router = express.Router();
let movieController = require("../controllers/movieController");
let directorController = require("../controllers/directorController");
let categoryController = require("../controllers/categoryController");

/* GET home page. */
router.get("/", movieController.movielist_get);

router.get("/detail/:id", movieController.movieDetail_get);

router.get("/movie_add", movieController.movie_create_get);

router.post("/movie_add", movieController.movie_create_post);

router.get("/categories", categoryController.categoriesList_get);

router.get("/categories/:id", categoryController.categories_movie_get);

router.get("/detail/:id/movie_update", movieController.movie_update_get);

router.post("/detail/:id/movie_update", movieController.movie_update_post);

router.get("/detail/:id/movie_delete", movieController.movie_delete_get);

module.exports = router;
