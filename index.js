'use strict';

// require('dotenv').config();
// const { db } = require('./src/models/index.js');
// const { server } = require('./src/server.js');
// const PORT = process.env.PORT || 3000

// db.sync().then(() => {
//     server.start(PORT);
// });

// server.start(PORT);

'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

server.start(PORT);
