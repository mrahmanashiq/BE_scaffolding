const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { User } = require('./User');

const Tweet = sequelize.define('Tweet', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);
User.hasMany(Tweet);

module.exports = { Tweet };