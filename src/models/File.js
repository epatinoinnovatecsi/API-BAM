const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const File = sequelize.define('file', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    timestamps: false
});



module.exports = File;