const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt');

const Admin = sequelize.define('admin', {
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
});

Admin.prototype.toJSON = function () {
   const values = { ...this.get() };
   delete values.password ;
   return values;
};

Admin.beforeCreate(async (user) => {
    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
})

module.exports = Admin;