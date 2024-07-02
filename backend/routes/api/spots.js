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

//===================A TEST SPOT OBJECT========================

// {
//   "ownerId": 1,
//   "address": "111 test",
//   "city": "Testtown",
//   "state": "Testifornia",
//   "country": "Testia",
//   "lat": "50.1234",
//   "lng": "-70.5678",
//   "name": "Testing",
//   "description": "This is a test",
//   "price": 1
// }

// ------------------helpers----------------------------------------------

/**
 * returns image url or N/A of a spot
 */
const previewImage = (spot) => {
  let previewImage;

  if (spot.SpotImages[0]) {
    previewImage = spot.SpotImages[0].url;
  } else previewImage = "N/A";

  return previewImage;
};

/**
 * returns average rating or N/A of a spot
 */
const avgRating = (spot) => {
  let avgRating;
  if (spot.Reviews.length > 0) {
    let length = spot.Reviews.length;
    let sum = 0;
    let avg;
    for (let Review of spot.Reviews) {
      sum = sum + Review.stars;
    }
    avg = (sum / length).toFixed(1);
    avgRating = avg;
  } else {
    avgRating = "N/A";
  }
  return avgRating;
};

/**
 * returns nuSpot from spot w expected attributes only
 */
const nuSpot = (spot) => {
  let nuSpot = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat.toFixed(4),
    lng: spot.lng.toFixed(4),
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    previewImage: spot.previewImage,
    avgRating: spot.avgRating,
  };
  return nuSpot;
};

//=========GET ALL REVIEWS BY A SPOTS ID==========
router.get("/:spotId/reviews", async (req, res, next) => {
  const spotId = req.params.spotId;

  // console.log("REQ================ ", req);

  // console.log("REQ.url=============", req.url);

  // console.log("REQ.path ===========", req.path)

  // console.log("REQ.params===========", req.params);

  // console.log("spotId ==============", spotId);

  const spot = await Spot.findByPk(spotId);
  // console.log("spot ==============", spot);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const spotReviews = await Review.findAll({
    where: { spotId: spotId },
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
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  let Reviews = { Reviews: spotReviews };

  return res.json(Reviews);
});

// ====ADD AN IMAGE TO A SPOT BASED ON THE SPOTS ID==AKA CREATE AN IMAGE FOR A SPOT==========================
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

  const ownerId = req.user.id;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (ownerId !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  const nuSpotImage = SpotImage.build({
    spotId: spotId,
    url: url,
    preview: preview,
  });

  await nuSpotImage.validate();
  await nuSpotImage.save();

  const nuSpotImageFromDb = await SpotImage.findOne({
    attributes: ["id", "url", "preview"],
    where: [{ url: url }, { spotId: spotId }],
  });

  res.status(200).json(nuSpotImageFromDb);
});

// ====CREATE A REVIEW FOR A SPOT BASED ON THE SPOTS ID==========================
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;

  if (typeof stars === "string") {
    stars = +stars;
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
      starts: "Stars must be an integer from 1 to 5",
    };
    return next(err);
  }

  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const userId = req.user.id;

  const exists = await Review.findAll({
    where: [{ spotId: spotId }, { userId: userId }],
  });

  if (exists.length) {
    const err = new Error("User already has a review for this spot");
    err.status = 500;
    return next(err);
  }

  const nuReview = await Review.build({
    spotId: spotId,
    userId: userId,
    review: review,
    stars: stars,
  });

  await nuReview.validate();
  await nuReview.save();

  res.json(nuReview);
});

// ============================================================================
// BOOKINGS
// ============================================================================
//=========GET ALL Bookings BY A SPOTS ID==========
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const userId = req.user.id;

  // console.log("REQ================ ", req);

  // console.log("REQ.url=============", req.url);

  // console.log("REQ.path ===========", req.path)

  // console.log("REQ.params===========", req.params);

  // console.log("spotId ==============", spotId);

  const spot = await Spot.findByPk(spotId);
  // console.log("spot ==============", spot);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spot.ownerId !== userId) {
    const spotBookings = await Booking.findAll({
      where: { spotId: spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });

    let Bookings = { Bookings: spotBookings };
    return res.json(Bookings);
  }

  if (spot.ownerId === userId) {
    const spotBookings = await Booking.findAll({
      where: { spotId: spotId },
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
      attributes: [
        "id",
        "spotId",
        "userId",
        "startDate",
        "endDate",
        "createdAt",
        "updatedAt",
      ],
    });

    let Bookings = { Bookings: spotBookings };

    return res.json(Bookings);
  }
});

// ====CREATE A booking FOR A SPOT BASED ON THE SPOTS ID==========================
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const spotId = req.params.spotId;

  // couldnt find the spot
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // authorization
  const userId = req.user.id;
  if (spot.ownerId === userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

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
  // validation
  if (startDate < today || startDate >= endDate) {
    const err = new Error("Bad Request");
    err.status = 400;
    err.errors = {
      startDate: "startDate cannot be in the past",
      endDate: "endDate cannot be on or before startDate",
    };
    return next(err);
  }

  // booking conflict
  const existingBookings = await Booking.findAll({
    where: [{ spotId: spotId }],
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

  // SUCCESS
  const nubooking = await Booking.build({
    spotId: spotId,
    userId: userId,
    startDate: startDate,
    endDate: endDate,
  });

  await nubooking.validate();
  await nubooking.save();

  res.json(nubooking);
});

// ============================================================================
// SPOTS
// ============================================================================

// ====GET ALL SPOTS OWNED BY THE CURRENT USER============================
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const currUserSpots = await Spot.findAll({
    where: { ownerId: userId },
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
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ],
    include: [
      { model: SpotImage, attributes: ["url"] },
      { model: Review, attributes: ["stars"] },
    ],
  });

  let Spots = [];

  for (let spot of currUserSpots) {
    spot.previewImage = previewImage(spot);
    spot.avgRating = avgRating(spot);
    Spots.push(nuSpot(spot));
  }

  return res.json(Spots);
});

// ==================GET A SPOT BY ID =========================================
router.get("/:spotId", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
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
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ],
    include: [
      { model: SpotImage, attributes: ["url", "id", "preview"] },
      { model: Review, attributes: ["stars"] },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  let result;
  result = nuSpot(spot);
  result.numReviews = spot.Reviews.length;
  result.avgStarRating = avgRating(spot);
  result.SpotImages = spot.SpotImages;
  // result.previewImage = previewImage(spot);
  result.Owner = spot.User;

  res.json(result);
});

// ==================GET ALL SPOTS=========================================
router.get("/", async (req, res) => {
  let { size, page } = req.query;

  if (!page) page = 1;
  if (!size) size = 5;

  if (page < 1 || isNaN(page)) page = 1;
  if (size < 1 || isNaN(size)) size = 5;

  if (size > 5) size = 5;

  const pagination = {};

  if (size > 0 && page > 0) {
    pagination.limit = parseInt(size);
    pagination.offset = parseInt(size) * parseInt(page - 1);
  }

  let theSpots = await Spot.findAll({
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
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ],
    include: [
      { model: SpotImage, attributes: ["url"] },
      { model: Review, attributes: ["stars"] },
    ],
    ...pagination,
  });

  let Spots = [];

  for (let spot of theSpots) {
    spot.previewImage = previewImage(spot);
    spot.avgRating = avgRating(spot);
    Spots.push(nuSpot(spot));
  }

  return res.json({ Spots, page, size });
});

// ==================CREATE A SPOT=========================================
router.post("/", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;

  if (
    (typeof address !== "string" && address !== undefined) ||
    address === undefined ||
    address === "" ||
    address === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { address: "Street address is required" };
    err.status = 400;
    return next(err);
  }
  if (
    (typeof city !== "string" && city !== undefined) ||
    city === undefined ||
    city === "" ||
    city === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { city: "City is required" };
    err.status = 400;
    return next(err);
  }
  if (
    (typeof state !== "string" && state !== undefined) ||
    state === undefined ||
    state === "" ||
    state === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { state: "State is required" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof country !== "string" && country !== undefined) ||
    country === undefined ||
    country === "" ||
    country === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { country: "Country is required" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof parseFloat(lat) !== "number" && lat !== undefined) ||
    parseFloat(lat) < -90 ||
    parseFloat(lat) > 90 ||
    lat === undefined ||
    lat === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { lat: "Latitude must be within -90 and 90" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof parseFloat(lng) !== "number" && lng !== undefined) ||
    parseFloat(lng) < -180 ||
    parseFloat(lng) > 180 ||
    lng === undefined ||
    lng === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { lng: "Longitude must be within -180 and 180" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof name !== "string" && name !== undefined) ||
    name.length > 50 ||
    name === "" ||
    name === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { name: "Name must be less than 50 characters" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof description !== "string" && description !== undefined) ||
    description === "" ||
    description === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { description: "Description is required" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof price !== "number" && price !== undefined) ||
    price < 1 ||
    price === undefined ||
    price === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { price: "Price per day must be a positive number" };
    err.status = 400;
    return next(err);
  }

  const exists = await Spot.findAll({
    where: [
      { ownerId: ownerId },
      { address: address },
      { city: city },
      { state: state },
    ],
  });

  if (exists.length) {
    const err = new Error("Spot already exists");
    err.status = 409;
    next(err);
  } else {
    const nuSpot = await Spot.build({
      ownerId: ownerId,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });

    await nuSpot.validate();
    await nuSpot.save();
  }

  const nuSpotFromDb = await Spot.findOne({
    where: [
      { ownerId: ownerId },
      { address: address },
      { city: city },
      { state: state },
    ],
  });

  res.status(201).json(nuSpotFromDb);
});

// ==================EDIT A SPOT=========================================
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;

  const spotToUpdate = await Spot.findByPk(req.params.spotId);

  if (!spotToUpdate) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spotToUpdate.ownerId !== ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  if (
    (typeof address !== "string" && address !== undefined) ||
    address === undefined ||
    address === "" ||
    address === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { address: "Street address is required" };
    err.status = 400;
    return next(err);
  }
  if (
    (typeof city !== "string" && city !== undefined) ||
    city === undefined ||
    city === "" ||
    city === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { city: "City is required" };
    err.status = 400;
    return next(err);
  }
  if (
    (typeof state !== "string" && state !== undefined) ||
    state === undefined ||
    state === "" ||
    state === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { state: "State is required" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof country !== "string" && country !== undefined) ||
    country === undefined ||
    country === "" ||
    country === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { country: "Country is required" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof parseFloat(lat) !== "number" && lat !== undefined) ||
    parseFloat(lat) < -90 ||
    parseFloat(lat) > 90 ||
    lat === undefined ||
    lat === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { lat: "Latitude must be within -90 and 90" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof parseFloat(lng) !== "number" && lng !== undefined) ||
    parseFloat(lng) < -180 ||
    parseFloat(lng) > 180 ||
    lng === undefined ||
    lng === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { lng: "Longitude must be within -180 and 180" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof name !== "string" && name !== undefined) ||
    name.length > 50 ||
    name === "" ||
    name === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { name: "Name must be less than 50 characters" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof description !== "string" && description !== undefined) ||
    description === "" ||
    description === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { description: "Description is required" };
    err.status = 400;
    return next(err);
  }

  if (
    (typeof price !== "number" && price !== undefined) ||
    price < 1 ||
    price === undefined ||
    price === null
  ) {
    const err = new Error("Bad Request");
    err.errors = { price: "Price per day must be a positive number" };
    err.status = 400;
    return next(err);
  }

  if (address !== undefined) spotToUpdate.address = address;
  if (city !== undefined) spotToUpdate.city = city;
  if (state !== undefined) spotToUpdate.state = state;
  if (country !== undefined) spotToUpdate.country = country;
  if (lat !== undefined) spotToUpdate.lat = lat;
  if (lng !== undefined) spotToUpdate.lng = lng;
  if (name !== undefined) spotToUpdate.name = name;
  if (description !== undefined) spotToUpdate.description = description;
  if (price !== undefined) spotToUpdate.price = price;

  await spotToUpdate.save();

  res.json(spotToUpdate);
});

// ==================DELETE A SPOT=========================================
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotToDelete = await Spot.findByPk(req.params.spotId);
  const userId = req.user.id;

  if (!spotToDelete) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spotToDelete.ownerId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  await spotToDelete.destroy();
  res.json({ message: "Successfully Deleted" });
});

module.exports = router;
