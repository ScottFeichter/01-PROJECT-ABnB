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
  const reviewId = +req.params.reviewId;

  // console.log("userId================", userId);

  // console.log("reviewId=========", reviewId);

  const review = await Review.findByPk(reviewId);

  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  // console.log("review==========", review);

  // console.log("review.userId========", review.userId);

  if (review.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  const reviewImages = await ReviewImage.findAll({
    where: { reviewId: reviewId },
  });

  // console.log("reviewImages=====", reviewImages.length);

  if (reviewImages.length >= 9) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    return next(err);
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

// ====EDIT A REVIEW ============================

router.put("/:reviewId", requireAuth, async (req, res, next) => {
  let { review, stars } = req.body;
  stars = +stars;
  const userId = req.user.id;
  let reviewId = req.params.reviewId;
  reviewId = +reviewId;

  // console.log("stars", typeof stars, "review", typeof review, "userId", typeof userId, "reviewId", typeof reviewId);

  const reviewToUpdate = await Review.findByPk(reviewId);

  if (!reviewToUpdate) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (reviewToUpdate.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  if (
    typeof review !== "string" ||
    review === "" ||
    review === undefined ||
    review === null
  ) {
    const err = new Error("Bad Request");
    err.status = 400;
    err.errors = {
      review: "Review text is required",
    };
    return next(err);
  }

  if (
    typeof stars !== "number" ||
    !Number.isInteger(stars) ||
    stars < 1 ||
    stars > 5 
  ) {
    const err = new Error("Bad Request");
    err.status = 400;
    err.errors = {
      stars: "Stars must be an integer from 1 to 5",
    };
    return next(err);
  }

  if (review !== undefined) reviewToUpdate.review = review;
  if (stars !== undefined) reviewToUpdate.stars = stars;

  await reviewToUpdate.save();

  res.json(reviewToUpdate);
});

// ====DELETE A REVIEW ============================
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const reviewToDelete = await Review.findByPk(req.params.reviewId);
  const userId = req.user.id;

  if (!reviewToDelete) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (reviewToDelete.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  await reviewToDelete.destroy();
  res.json({ message: "Successfully Deleted" });
});

//=========GET ALL REVIEWS OF CURRENT USER==========
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  let currUserReviews = await Review.findAll({
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
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
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
        include: [
          {
            model: SpotImage,
            attributes: [["url", "previewImage"]],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  let reviews = [];

  currUserReviews.forEach((review) => {
    reviews.push(review.toJSON());
  });

  reviews.forEach((review) => {
    review.Spot.previewImage = review.Spot.SpotImages[0].previewImage;
    delete review.Spot.SpotImages;
  });

  let theReviews = { Reviews: reviews };

  return res.json(theReviews);
});

module.exports = router;
