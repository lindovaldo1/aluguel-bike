'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      exit_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      return_time: {
        type: Sequelize.DATE,
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
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      bike_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'bikes',
          key: 'id',
        },
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('rents')
  }
};
