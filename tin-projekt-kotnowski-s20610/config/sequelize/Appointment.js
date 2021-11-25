const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Appointment = sequelize.define('Appointment', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    visitDate: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    prescription: {
        type: Sequelize.STRING,
        allowNull: true
    },
    visitDescription: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Appointment;