const express = require("express");
const {
  Spot,
  SpotImage,
  Review,
  User,
  Booking,
  ReviewImage,
} = require("../../db/models");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

const { validationResult, matchedData } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

// ------------------helpers----------------------------------------------

//none

// ====ADD AN IMAGE TO A REVIEW BASED ON THE REVIEWS ID============================
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  // console.log("review==========", review);

  const reviewImages = await ReviewImage.findAll({
    where: { reviewId: reviewId },
  });

  // console.log("reviewImages=====", reviewImages.length);

  if (reviewImages.length >= 9) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    return next(err)
  }

  const nuReviewImage = ReviewImage.build({
    reviewId: reviewId,
    url: url,
  });

  await nuReviewImage.validate();
  await nuReviewImage.save();

  const nuReviewImageFromDb = await ReviewImage.findOne({
    attributes: ["id", "url"],
    where: [{ url: url }, { reviewId: reviewId }],
  });

  res.status(200).json(nuReviewImageFromDb);
});

//=========GET ALL REVIEWS OF CURRENT USER==========
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const currUserReviews = await Review.findAll({
    where: { userId: userId },
    attributes: [
      "id",
      "userId",
      "spotId",
      "review",
      "stars",
      "createdAt",
      "updatedAt",
    ],
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [{ model: SpotImage, attributes: "url" }],
      },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  console.log(currUserReviews);

  return res.json(currUserReviews);
});

module.exports = router;
