const express = require("express");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking
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



// ====EDIT A booking ============================

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  let { booking, stars } = req.body;
  stars = +stars;
  const userId = req.user.id;
  let bookingId = req.params.bookingId;
  bookingId = +bookingId;

  console.log("stars", typeof stars, "booking", typeof booking, "userId", typeof userId, "bookingId", typeof bookingId);

  const bookingToUpdate = await booking.findByPk(bookingId);

  if (!bookingToUpdate) {
    const err = new Error("booking couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (bookingToUpdate.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  if (
    typeof booking !== "string" ||
    booking === "" ||
    typeof stars !== "number" ||
    !Number.isInteger(stars) ||
    stars < 1 ||
    stars > 5
  ) {
    const err = new Error("Bad Request");
    err.status = 400;
    err.errors = {
      booking: "booking text is required",
      stars: "Stars must be an integer from 1 to 5",
    };
    return next(err);
  }


  if (booking !== undefined) bookingToUpdate.booking = booking;
  if (stars !== undefined) bookingToUpdate.stars = stars;

  await bookingToUpdate.save();

  res.json(bookingToUpdate);
});


// ====DELETE A booking ============================
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingToDelete = await booking.findByPk(req.params.bookingId);
  const userId = req.user.id;

  if (!bookingToDelete) {
    const err = new Error("booking couldn\'t be found");
    err.status = 404;
    return next(err);
  }

  if (bookingToDelete.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  await bookingToDelete.destroy();
  res.json({ message: "Successfully Deleted" });
});




//=========GET ALL bookingS OF CURRENT USER==========
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const currUserBookings = await Booking.findAll({
    where: { userId: userId },
    attributes: [
      "id",
      "spotId",
    ],
    include: [
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
        include: [{ model: SpotImage, attributes: ["url"] }],
      },
    ],
    attributes: [
      "userId",
      "startDate",
      "endDate",
      "createdAt",
      "updatedAt",
    ],
  });

  console.log("curruserbookings=========== ", currUserBookings);

  const theCurrentUserBookings = { Bookings: currUserBookings};

  return res.json(theCurrentUserBookings);
});


module.exports = router;
