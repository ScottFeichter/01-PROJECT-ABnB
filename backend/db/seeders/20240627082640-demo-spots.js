"use strict";

const { Spot } = require("../models");


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
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "999 Zebra Street",
          city: "San Diego",
          state: "California",
          country: "United States of America",
          lat: 32.7157,
          lng: -117.1611,
          name: "Zoo Suit Riot",
          description: "Cozy place next to the elephants",
          price: 500,
        },
        {
          ownerId: 2,
          address: "888 Diamond Way",
          city: "Antwerp",
          state: "Antwerp",
          country: "Belgium",
          lat: 51.2213,
          lng: 4.4051,
          name: "Cousin Evys",
          description: "There are no fugazi here",
          price: 9000,
        },
        {
          ownerId: 3,
          address: "777 Palace Blvd",
          city: "Westminster",
          state: "Greater London",
          country: "England",
          lat: 51.4975,
          lng: 0.1357,
          name: "Casa Carlos",
          description: "Feel like royalty at this historic landmark",
          price: 500,
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ["Zoo Suit Riot", "Cousin Evys", "Casa Carlos"] },
      },
      {}
    );
  },
};
