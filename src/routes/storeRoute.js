const express = require('express');

const storeRouter = express.Router();

storeRouter.get('/category', handleCategory)



async function handleCategory(req, res, next) {
    try {
        const categoryArray = [

            { name: "Electronics", active: true },
            { name: "Accessories", active: false },
            { name: "Toys", active: false },
            { name: "Home & Kitchen", active: false },
        ];

        res.status(200).json(categoryArray);

    } catch (err) {
        next(err)
    }
}

module.exports = storeRouter;