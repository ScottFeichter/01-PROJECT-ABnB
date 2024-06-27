const express = require("express");
const { Spot } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: {
      SpotImages,
      Reviews
    }
  });

  res.json(spots);
});

module.exports = router;
