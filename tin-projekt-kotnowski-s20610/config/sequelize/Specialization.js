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
    }
});

module.exports = Specialization;