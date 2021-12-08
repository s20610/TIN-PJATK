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
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [10,10],
                msg: "Data w formacie YYYY-MM-DD"
            }
        }
    },
    prescription: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    visitDescription: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Appointment;