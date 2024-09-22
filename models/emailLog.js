const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Schedule = require('./schedule');
const User = require('./user');

const EmailLog = sequelize.define('EmailLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Schedule,
            key: 'user_id'
        }
    },
    recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    email_type: {
        type: DataTypes.ENUM('1hr', '30min', '15min', 'admin'),
        allowNull: false
    },
    email_sent_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'Email_Log',
    timestamps: false
});

module.exports = EmailLog;
