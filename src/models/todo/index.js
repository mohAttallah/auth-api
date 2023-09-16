'use strict';
const todoModel = (sequelize, DataTypes) => sequelize.define('todo', {
    assigned: { type: DataTypes.STRING, required: true },
    item: { type: DataTypes.STRING, required: true },
    difficulty: { type: DataTypes.INTEGER, required: true },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = todoModel;