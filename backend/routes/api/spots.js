const express = require("express");
const { Spot, SpotImage, Review } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: {
      SpotImage,
      Review
    }
  });

  res.json(spots);
});

module.exports = router;
