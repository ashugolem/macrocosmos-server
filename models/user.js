const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'employee'),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
