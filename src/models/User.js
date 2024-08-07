const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isBlock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    timeAllowed: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    },
});

User.prototype.toJSON = function () {
   const values = { ...this.get() };
   delete values.password ;
   return values;
};

module.exports = User;