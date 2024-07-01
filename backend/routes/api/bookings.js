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

// ------------------helpers----------------------------------------------

//none

// ====EDIT A booking ============================

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  let { startDate, endDate } = req.body;
  let bookingId = req.params.bookingId;
  bookingId = +bookingId;

  const userId = req.user.id;

  const bookingToUpdate = await Booking.findByPk(bookingId);

  if (!bookingToUpdate) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (bookingToUpdate.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // NEED LOGIC !!!!!!!

  // comparing dates helper
  const getToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  let today = getToday();

  // booking is past end date
  if (endDate < today) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    return next(err);
  }

  // booking conflict
  const existingBookings = await Booking.findAll({
    where: [{ spotId: bookingToUpdate.spotId }],
    attributes: ["id", "startDate", "endDate"],
  });

  if (existingBookings.length) {
    for (let booking of existingBookings) {
      if (
        (booking.startDate >= startDate && booking.startDate <= endDate) ||
        (booking.endDate >= startDate && booking.endDate <= endDate)
      ) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.errors = {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        };
        err.status = 403;
        return next(err);
      }
    }
  }

  // success
  if (startDate !== undefined) bookingToUpdate.startDate = startDate;
  if (endDate !== undefined) bookingToUpdate.endDate = endDate;

  await bookingToUpdate.save();

  res.json(bookingToUpdate);
});

// ====DELETE A booking ============================
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingToDelete = await Booking.findByPk(req.params.bookingId);
  const userId = req.user.id;

  if (!bookingToDelete) {
    const err = new Error("booking couldn't be found");
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
    attributes: ["id", "spotId"],
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
    attributes: ["userId", "startDate", "endDate", "createdAt", "updatedAt"],
  });

  // console.log("curruserbookings=========== ", currUserBookings);

  const theCurrentUserBookings = { Bookings: currUserBookings };

  return res.json(theCurrentUserBookings);
});

module.exports = router;
