'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('bike', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
     },
     model: {
      type: Sequelize.STRING,        
      allowNull: false,
     },
     color: {
      type: Sequelize.STRING,        
      allowNull: false,
     },
     fabrication_year: {
      type: Sequelize.DATE,        
      allowNull: false,
     },
     wheels: {
       type: Sequelize.INTEGER,
       allowNull: false,
     },
     state: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bike');
  }
};
