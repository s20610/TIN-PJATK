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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            len: {
                args: [0,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
});

module.exports = Doctor;