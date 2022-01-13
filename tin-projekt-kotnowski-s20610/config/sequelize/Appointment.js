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
                args: [9,10],
                msg: "Data w formacie YYYY-MM-DD"
            }
        }
    },
    prescription: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0,100],
                msg: "Od 0 do 100 znaków"
            }
        }
    },
    visitDescription: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0,100],
                msg: "Od 0 do 100 znaków"
            }
        }
    }
});

module.exports = Appointment;