'use strict';

const express = require('express');
const cors = require('cors');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
const authRoutes = require('./auth/routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to Home page"
    })
})

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(authRoutes);



app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`Listening on ${port}`));
    },
};