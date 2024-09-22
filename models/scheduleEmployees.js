const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Schedule = require('./schedule');

const ScheduleEmployee = sequelize.define('ScheduleEmployee', {
    ScheduleEmployee_id: {
        type: DataTypes.INTEGER,
        // autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        references:{
            model: Schedule,
            key: 'schedule_id'
        }
    }
}, {
    tableName: 'ScheduleEmployee',
    timestamps: false
});

module.exports = ScheduleEmployee;
