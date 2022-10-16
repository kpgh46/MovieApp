var express = require("express");
var router = express.Router();
let movieController = require("../controllers/movieController");
let directorController = require("../controllers/directorController");

/* GET home page. */
router.get("/", movieController.movielist_get);

router.get("/detail/:id", movieController.movieDetail_get);

router.get("/movie_add", movieController.movie_create_get);

router.post("/movie_add", movieController.movie_create_post);

module.exports = router;
