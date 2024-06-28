const express = require("express");
const { Spot, SpotImage, Review, User } = require("../../db/models");

const { Op } = require("sequelize");


const router = express.Router();

// ==================GET ALL SPOTS=========================================

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

// ------------------handler----------------------------------------------
router.get("/", async (req, res) => {
  let spots = await Spot.findAll({
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

  for (let spot of spots) {
    spot.previewImage = previewImage(spot);
    spot.avgRating = avgRating(spot);
    nuSpots.push(nuSpot(spot));
  }

  res.json(nuSpots);
});


// ==================GET A SPOT BY ID =========================================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.get("/:spotId", async (req, res) => {
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
      { model: User, attributes: ["id", "firstName", "lastName"]}
    ],
  });


  let result;
  result = nuSpot(spot);
  result.numReviews = spot.Reviews.length;
  result.avgStarRating = avgRating(spot);
  result.spotImages = spot.SpotImages;
  // result.previewImage = previewImage(spot);
  result.Owner = spot.User;



  res.json(result);
});


// ==================CREATE A SPOT=========================================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.post('/', async (req, res, next) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
  // need aggregate unique of address city state
  // check if exists

  // const exists = await findOne({
  //   where: [{address: address},{city: city}, {state: state}]
  // });

  const nuSpot = Spot.build({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  await nuSpot.validate();
  await nuSpot.save();

  res.json(nuSpot);
});


// ==================EDIT A SPOT=========================================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.put('/:spotId', async (req, res)=> {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
    const spotToUpdate = await Spot.findByPk(req.params.spotId);

    if(ownerId !== undefined) spotToUpdate.ownerId = ownerId;
    if(address !== undefined) spotToUpdate.address = address;
    if(city !== undefined) spotToUpdate.city = city;
    if(state !== undefined) spotToUpdate.state = state;
    if(country !== undefined) spotToUpdate.country = country;
    if(lat !== undefined) spotToUpdate.lat = lat;
    if(lng !== undefined) spotToUpdate.lng = lng;
    if(name !== undefined) spotToUpdate.name = name;
    if(description !== undefined) spotToUpdate.description = description;
    if(price !== undefined) spotToUpdate.price = price;

    await spotToUpdate.save();

    res.json(spotToUpdate);
});


// ==================DELETE A SPOT=========================================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.delete('/:spotId', async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId);
    await spotToDelete.destroy();

    res.json({message: "Successfully Deleted"});


});


module.exports = router;
