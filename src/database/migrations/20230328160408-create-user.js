'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', {
       id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
       },
       name: {
        type: Sequelize.STRING,        
        allowNull: false,
       },
       email: {
        type: Sequelize.STRING,        
        allowNull: false,
       },
       password: {
        type: Sequelize.STRING,        
        allowNull: false,
       },
       birthdate: {
         type: Sequelize.DATE,
         allowNull: false,
       },
       state: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
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
     await queryInterface.dropTable('users');     
  }
};
