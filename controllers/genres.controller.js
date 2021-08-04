const Genres = require("../models/Genres.model");

module.exports.genresController = {
  getAllGenres: async (req, res) => {
    try {
      const genres = await Genres.find();

      return res.json(genres);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getGenresById: async (req, res) => {
    const { id } = req.params;

    try {
      const genres = await Genres.findById(id);

      if (!genres) {
        return res.status(404).json({
          error: "Жанр с таким ID не найден",
        });
      }

      return res.json(genres);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createGenre: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать название нового Жанра",
      });
    }

    try {
      const genres = await Genres.create({ name });

      return res.json(genres);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeGenre: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Genres.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить жанр. Укажите верный ID",
        });
      }

      return res.json({
        message: "Жанр успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editGenres: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое название",
      });
    }

    try {
      const edited = await Genres.findByIdAndUpdate(
        id,
        { name },
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
};
