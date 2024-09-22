const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Schedule = sequelize.define('Schedule', {
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    schedule_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    schedule_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    schedule_comment: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    tableName: 'Schedules',
    timestamps: false
});

module.exports = Schedule;
