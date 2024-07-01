'use strict';

const { SpotImage } = require("../models");

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
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://thetrekplanner.com/wp-content/uploads/2013/12/IMG_9494.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://external-preview.redd.it/k2cRGfm61Jj7Tc2SfyKBrVuhro0ctgynP8Gtv1ph6wE.jpg?width=640&crop=smart&auto=webp&s=a230d6f70d6cc9e64e01946702e497d5e28baff5",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://cmsadmin.rct.uk/sites/default/files/Buckingham%20Palace%20landing%20guards.jpg",
          preview: true,
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
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: { [Op.in]: ["https://thetrekplanner.com/wp-content/uploads/2013/12/IMG_9494.jpg",
          "https://external-preview.redd.it/k2cRGfm61Jj7Tc2SfyKBrVuhro0ctgynP8Gtv1ph6wE.jpg?width=640&crop=smart&auto=webp&s=a230d6f70d6cc9e64e01946702e497d5e28baff5",
          "https://cmsadmin.rct.uk/sites/default/files/Buckingham%20Palace%20landing%20guards.jpg"]},
      },
      {}
    );
  }
};
