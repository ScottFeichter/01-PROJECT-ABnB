'use strict';


const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "https://www.trolleytours.com/wp-content/uploads/2016/06/san-diego-zoo-polar-bear.jpg",
        },
        {
          reviewId: 2,
          url: "https://nypost.com/wp-content/uploads/sites/2/2019/11/ap_19324001821357.jpg?quality=75&strip=all",
        },
        {
          reviewId: 3,
          url: "https://media.wired.com/photos/5c1197b9e4cb650e808493a0/master/pass/Science-Zoo-Wildfires-1059590024-w.jpg",
        },
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: { [Op.in]: ["https://www.trolleytours.com/wp-content/uploads/2016/06/san-diego-zoo-polar-bear.jpg",
          "https://nypost.com/wp-content/uploads/sites/2/2019/11/ap_19324001821357.jpg?quality=75&strip=all",
          "https://media.wired.com/photos/5c1197b9e4cb650e808493a0/master/pass/Science-Zoo-Wildfires-1059590024-w.jpg"]},
      },
      {}
    );
  }
};
