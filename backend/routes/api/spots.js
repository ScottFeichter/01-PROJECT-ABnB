const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");

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

  if(!spot) {
    const err = new Error("Spot couldn\'t be found");
    err.status = 404;
    return next(err)
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

  let nuSpots = [];

  for (let spot of currUserSpots) {
    spot.previewImage = previewImage(spot);
    spot.avgRating = avgRating(spot);
    nuSpots.push(nuSpot(spot));
  }

  return res.json(currUserSpots);
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
  result.spotImages = spot.SpotImages;
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

  let spots = [];

  for (let spot of theSpots) {
    spot.previewImage = previewImage(spot);
    spot.avgRating = avgRating(spot);
    spots.push(nuSpot(spot));
  }

  return res.json({ spots, page, size });
});

// ==================CREATE A SPOT=========================================
router.post("/", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;

  if (typeof address !== "string") {
    const err = new Error("Valid street address is required");
    err.status = 400;
    return next(err);
  }
  if (typeof city !== "string") {
    const err = new Error("Valid city required");
    err.status = 400;
    return next(err);
  }
  if (typeof state !== "string") {
    const err = new Error("Valid state required");
    err.status = 400;
    return next(err);
  }

  if (typeof country !== "string") {
    const err = new Error("Valid country required");
    err.status = 400;
    return next(err);
  }

  if (typeof parseFloat(lat) !== "number") {
    const err = new Error("Valid latitude required");
    err.status = 400;
    return next(err);
  }

  if (typeof parseFloat(lng) !== "number") {
    const err = new Error("Valid longitude required");
    err.status = 400;
    return next(err);
  }

  if (typeof name !== "string") {
    const err = new Error("Valid name required");
    err.status = 400;
    return next(err);
  }

  if (typeof description !== "string") {
    const err = new Error("Valid description required");
    err.status = 400;
    return next(err);
  }

  if (typeof price !== "number") {
    const err = new Error("Valid price required");
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
    const nuSpot = Spot.build({
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

  if (typeof address !== "string" || typeof address !== undefined) {
    const err = new Error("Valid street address is required");
    err.status = 400;
    return next(err);
  }
  if (typeof city !== "string" || typeof city !== undefined) {
    const err = new Error("Valid city required");
    err.status = 400;
    return next(err);
  }
  if (typeof state !== "string" || typeof state !== undefined) {
    const err = new Error("Valid state required");
    err.status = 400;
    return next(err);
  }

  if (typeof country !== "string" || typeof country !== undefined) {
    const err = new Error("Valid country required");
    err.status = 400;
    return next(err);
  }

  if (typeof parseFloat(lat) !== "number" || typeof lat !== undefined) {
    const err = new Error("Valid latitude required");
    err.status = 400;
    return next(err);
  }

  if (typeof parseFloat(lng) !== "number" || typeof lng !== undefined) {
    const err = new Error("Valid longitude required");
    err.status = 400;
    return next(err);
  }

  if (typeof name !== "string" || typeof name !== undefined) {
    const err = new Error("Valid name required");
    err.status = 400;
    return next(err);
  }

  if (typeof description !== "string" || typeof description !== undefined) {
    const err = new Error("Valid description required");
    err.status = 400;
    return next(err);
  }

  if (typeof price !== "number" || typeof price !== undefined) {
    const err = new Error("Valid price required");
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
    const err = new Error("Spot couldnn't be found");
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
