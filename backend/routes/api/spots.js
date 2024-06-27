const express = require("express");
const { Spot, SpotImage, Review, User } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', ],
    include: [{model: SpotImage, attributes: ['url']}, {model: Review, attributes: ['stars']}]
  });
  console.log("spots:  ", spots);

  res.json(spots);
});



module.exports = router;
