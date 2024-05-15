const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Activity = sequelize.define('activity', {
});

module.exports = Activity;