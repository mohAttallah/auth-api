'use strict';

const { db } = require('./src/models/index.js');
const { server, start } = require('./src/server.js');
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
    start(PORT);
});
