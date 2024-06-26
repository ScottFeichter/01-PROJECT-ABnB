"use strict";

const { Booking } = require("../models");

let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2024-01-01",
          endDate: "2024-01-02",
        },
        {
          spotId: 1,
          userId: 1,
          startDate: "2024-01-03",
          endDate: "2024-01-04",
        },
        {
          spotId: 1,
          userId: 1,
          startDate: "2024-01-05",
          endDate: "2024-01-06",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.eq] : [1] }
      },
    );
  },
};
