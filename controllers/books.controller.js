const Book = require("../models/Book.model");
const User = require("../models/User.model");

module.exports.booksController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find().populate("genres", "name");

      return res.json(books);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getBooksByGenreId: async (req, res) => {
    const { id } = req.params;

    try {
      const books = await Book.find({ genres: id }).populate("genres", "name");

      return res.json(books);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getBookById: async (req, res) => {
    const { id } = req.params;

    try {
      const book = await Book.findById(id).populate("genres", "name");

      if (!book) {
        return res.status(404).json({
          error: "Книга с таким ID не найдена",
        });
      }

      return res.json(book);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createBook: async (req, res) => {
    const { title, genre, user } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Необходимо указать название нового продукта",
      });
    }

    if (!genre) {
      return res.status(400).json({
        error: "Необходимо указать жанр нового продукта",
      });
    }

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать user",
      });
    }

    try {
      const book = await new Book({
        title,
        genre,
        user,
      });
      // if (image) {
      //   product.image = image;
      // }

      await book.save();
      return res.json(book);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeBook: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Book.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить книгу. Укажите верный ID",
        });
      }

      return res.json({
        message: "Книга успешно удалена",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editBook: async (req, res) => {
    const { title, genre, user } = req.body;
    const { id } = req.params;

    if (!title) {
      return res.status(400).json({
        error: "Необходимо указать новое название",
      });
    }

    if (!genre) {
      return res.status(400).json({
        error: "Необходимо указать жанр нового продукта",
      });
    }

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать user",
      });
    }
    try {
      const edited = await Book.findByIdAndUpdate(
        id,
        { title, genre, user },
        { new: true }
      );

      if (!edited) {
        return res.status(400).json({
          error: "Не удалось изменить название. Проверь правильность ID",
        });
      }

      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  takeBookAndBlock: async (req, res) => {
    try {
       await Book.findByIdAndUpdate(req.body.book, {
        rent: null
      });
      const user = await User.findByIdAndUpdate(req.params.user, {
        $pull: { rent: req.body.book },
      });
      user.isBlocked = true;
      res.json("deleted");
    } catch (e) {
      res.json(e.message);
    }
  },
};
