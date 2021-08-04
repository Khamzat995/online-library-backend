const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");

const router = Router();

router.post("/admin/genre", genresController.createGenre);
router.get("/genres", genresController.getAllGenres);
router.get("/genres/:id", genresController.getGenresById);
router.patch("/admin/genre/:id", genresController.editGenres);
router.delete("/admin/genre/:id", genresController.removeGenre);

module.exports = router;
