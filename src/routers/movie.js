const express = require("express");
const {
    getMovies,
    getAllScreenings,
    getRuntimes,
    getMovieBy,
    updateMovie,
    createMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getMovies);
router.get("/screenings", getAllScreenings);


router.get("/query?lessthen=:runtime", getRuntimes);
router.get("/query?greaterthan=:runtime", getRuntimes);

router.get("/id=:id", getMovieBy);
router.get("/title=:title", getMovieBy)

router.put("/update=:id", updateMovie)

router.post("/create", createMovie);


module.exports = router;
