const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Specialization = sequelize.define('Specialization', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    specializationName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Specialization;