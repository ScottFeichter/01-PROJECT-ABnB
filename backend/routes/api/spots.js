const express = require("express");
const { Spot, SpotImage, Review, User } = require("../../db/models");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

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

// ====GET ALL SPOTS OWNED BY THE CURRENT USER============================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  console.log("userId========== ", userId);



  const currUserSpots = await Spot.findAll({
    where: {ownerId: userId},
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
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
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
      { model: User, attributes: ["id", "firstName", "lastName"]}
    ],
  });

  if(!spot) {
    const err = new Error('Spot couldn\'t be found');
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


// ==================CREATE A SPOT=========================================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  // need aggregate unique of address city state
  // check if exists

   // {
  //   "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
  //   "errors": {
  //     "address": "Street address is required",
  //     "city": "City is required",
  //     "state": "State is required",
  //     "country": "Country is required",
  //     "lat": "Latitude must be within -90 and 90",
  //     "lng": "Longitude must be within -180 and 180",
  //     "name": "Name must be less than 50 characters",
  //     "description": "Description is required",
  //     "price": "Price per day must be a positive number"
  //   }
  // }

  const exists = await Spot.findAll({
    where: [{ownerId: ownerId}, {address: address},{city: city}, {state: state}]
  });


  if(exists.length) {
    const err = new Error('Spot already exists');
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
      price: price
    });

    await nuSpot.validate();
    await nuSpot.save();

  }



  const nuSpotFromDb = await Spot.findOne({
    where: [{ownerId: ownerId}, {address: address},{city: city}, {state: state}]
  })



  res.json(nuSpotFromDb);
});


// ==================EDIT A SPOT=========================================
// ------------------helpers----------------------------------------------
// ------------------handler----------------------------------------------
router.put('/:spotId', requireAuth, async (req, res, next)=> {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    const spotToUpdate = await Spot.findByPk(req.params.spotId);

    if(!spotToUpdate) {
      const err = new Error('Spot couldn\'t be found');
      err.status = 404;
      return next(err);
    }

    if(spotToUpdate.ownerId !== ownerId) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }


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
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const spotToDelete = await Spot.findByPk(req.params.spotId);
    const userId = req.user.id;

    console.log("req.user.id==============", req.user.id);
    // console.log("spotToDelete.ownerId=====", spotToDelete.ownerId);

    if(!spotToDelete) {
      const err = new Error("Spot couldnn\'t be found");
      err.status = 404;
      return next(err);
    }

    if(spotToDelete.ownerId !== userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }


    await spotToDelete.destroy();
    res.json({message: "Successfully Deleted"});

});



module.exports = router;
