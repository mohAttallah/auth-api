'use strict';
//add todo model
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'anything';

const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('users', {
        username: { type: DataTypes.STRING, required: true, unique: true },
        password: { type: DataTypes.STRING, required: true },
        role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user' },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                
                return jwt.sign({ username: this.username }, SECRET);
            },
            set(tokenObj) {
                const payload = {
                    tokenObj: tokenObj,
                    role: this.role
                };
                let token = jwt.sign(payload, SECRET, this.role);
                return token;
            }
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    user: ['read'],
                    writer: ['read', 'create'],
                    editor: ['read', 'create', 'update'],
                    admin: ['read', 'create', 'update', 'delete']
                };
                return acl[this.role];
            }
        }
    });

    model.beforeCreate(async (user) => {
        let hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
    });
    // Basic AUTH: Validating strings (username, password) 

    model.authenticateBasic = async function (username, password) {
        console.log(username, password)
        const user = await this.findOne({ where: { username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) { return user; }
        throw new Error('Invalid User');
    };
    // Bearer AUTH: Validating a token

    model.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const user = this.findOne({ where: { username: parsedToken.username } });
            if (user) { return user; }
            throw new Error("User Not Found");
        } catch (e) {
            throw new Error(e.message)
        }
    };

    return model;
}

module.exports = userModel;