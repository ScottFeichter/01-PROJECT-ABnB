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



// ==================DELETE A SPOT IMAGE=========================================
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageToDelete = await SpotImage.findByPk(req.params.imageId);
  const userId = req.user.id;

  if (!imageToDelete) {
    const err = new Error("Spot Image couldn\'t be found");
    err.status = 404;
    return next(err);
  }

  const spot = await Spot.findByPk(imageToDelete.spotId);

  if (spot.ownerId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  await imageToDelete.destroy();
  res.json({ message: "Successfully Deleted" });
});



module.exports = router;
