const Sequelize = require ('sequelize');
const sequelize = new Sequelize ('tins20610sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;