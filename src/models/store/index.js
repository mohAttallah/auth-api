'use strict';

const storeModel = (sequelize, DataTypes) => sequelize.define('store', {
    title: { type: DataTypes.STRING, required: true },
    subtitle: { type: DataTypes.STRING, required: true },
    price: { type: DataTypes.INTEGER, required: true },
    quantity: { type: DataTypes.INTEGER, required: true },
    photo: { type: DataTypes.STRING, required: true },
    category: {
        type: DataTypes.ENUM('Electronics', 'Accessories', 'Toys', 'Home & Kitchen'),
        required: true
    }
});

module.exports = storeModel;