const express = require("express");
const router = express.Router();

const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../db/models");

module.exports = router;
