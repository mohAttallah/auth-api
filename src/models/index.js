'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/models/users');
const Collection = require('./data-collections.js');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const todoModel = require("./todo")
const storeModel = require("./store");
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};



const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const users = userModel(sequelize, DataTypes);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const todo = todoModel(sequelize, DataTypes);
const store = storeModel(sequelize, DataTypes);
module.exports = {
    db: sequelize,
    users: new Collection(users),
    food: new Collection(food),
    clothes: new Collection(clothes),
    userModel: userModel(sequelize, DataTypes),
    todo: new Collection(todo),
    store: new Collection(store)
};