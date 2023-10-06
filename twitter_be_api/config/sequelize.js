const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('twitter_opti', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
