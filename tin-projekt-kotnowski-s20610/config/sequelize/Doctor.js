const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Doctor = sequelize.define('Doctor', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    specializationId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Doctor;