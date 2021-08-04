const Review = require("../models/Review.model");

module.exports.reviewController = {
  createReview: async (req, res) => {
    const { user, book, text } = req.body;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать имя user",
      });
    }
    if (!book) {
      return res.status(400).json({
        error: "Необходимо указать ID продукта",
      });
    }

    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать текст",
      });
    }

    try {
      const review = await new Review({
        user,
        book,
        text,
      });

      await review.save();

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeReview: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Review.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить отзыв. Укажите верный ID",
        });
      }

      return res.json({
        message: "Отзыв успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getReviewByProductId: async (req, res) => {
    const { id } = req.params;

    try {
      const review = await Review.find({ book: id }).populate("book", "title");

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const review = await Review.find().populate("book", "title");

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
