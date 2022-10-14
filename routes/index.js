var express = require("express");
var router = express.Router();
let movieController = require("../controllers/movieController");
let directorController = require("../controllers/directorController");

/* GET home page. */
router.get("/", movieController.movieList);

router.get("/:id", movieController.movieDetail);

module.exports = router;
