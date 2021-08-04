const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.userController = {
  createUser: async (req, res) => {
    const { name, isBlocked } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать имя user",
      });
    }

    try {
      const user = await User.create({ name, isBlocked });

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await User.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить user. Укажите верный ID",
        });
      }

      return res.json({
        message: "User успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editUser: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое имя user",
      });
    }

    try {
      const edited = await User.findByIdAndUpdate(id, { name }, { new: true });

      if (!edited) {
        return res.status(400).json({
          error: "Не удалось изменить user. Проверь правильность ID",
        });
      }

      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  rentBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.book);
      const user = await User.findByIdAndUpdate(req.params.user);

      if (book.user) {
        res.json("Книга уже арендована");
      }

      if (user.isBlocked) {
        res.json("Вы заблокированы!");
      }

      if (user.rentBook.length > 2) {
        res.json("Нельзя арендовать больше 3-х книг одновременно.");
      }
      await User.findByIdAndUpdate(req.params.user, {
        $push: {
          rentBook: req.params.book,
        },
      });
      res.json("Книга успешно арендована");
    } catch (e) {
      res.json(e.message);
    }
  },
};
