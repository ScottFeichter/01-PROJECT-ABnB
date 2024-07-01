const express = require("express");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
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


// ==================DELETE A REVIEW IMAGE=========================================
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageToDelete = await ReviewImage.findByPk(req.params.imageId);
  const userId = req.user.id;

  if (!imageToDelete) {
    const err = new Error("Review Image couldn\'t be found");
    err.status = 404;
    return next(err);
  }

  const review = await Review.findByPk(imageToDelete.reviewId);
  // const spot = await Spot.findByPk(review.spotId);

  if (review.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  await imageToDelete.destroy();
  res.json({ message: "Successfully Deleted" });
});



module.exports = router;
