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
