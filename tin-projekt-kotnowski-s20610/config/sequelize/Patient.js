const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Patient = sequelize.define('Patient', {
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
    chronicDiseases: {
        type: Sequelize.STRING,
        allowNull: true
    },
    PESEL: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Patient;