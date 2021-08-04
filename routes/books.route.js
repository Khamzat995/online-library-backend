const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");

const router = Router();

router.post("/admin/book", booksController.createBook);
router.get("/books", booksController.getAllBooks);
router.get("/book/:id", booksController.getBookById);
router.get("/books/genre/:id", booksController.getBooksByGenreId);
router.patch("/admin/book/:id", booksController.editBook);
router.delete("/admin/book/:id", booksController.removeBook);
router.patch("/admin/book/user/:id", booksController.takeBookAndBlock);

module.exports = router;
