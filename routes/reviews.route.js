const { Router } = require("express");
const { reviewController } = require("../controllers/reviews.controller");

const router = Router();

router.post("/user/review", reviewController.createReview);
router.get("/user/reviews/book/:id", reviewController.getReviewByProductId);
router.get("/reviews", reviewController.getAllReviews);
router.delete("/admin/review/:id", reviewController.removeReview);

module.exports = router;
