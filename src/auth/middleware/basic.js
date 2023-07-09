'use strict';

const base64 = require('base-64');
const { users } = require('../../models/index');

module.exports = async (req, res, next) => {

    console.log(req.headers.authorization)
    if (!req.headers.authorization) { return _authError(); }

    let basic = req.headers.authorization.split(' ').pop();

    console.log(basic)
    let [user, pass] = base64.decode(basic).split(':');

    console.log('this is the user collection: ', users)
    try {
        req.user = await users.model.authenticateBasic(user, pass)
        console.log("Authentication successful");
        next();
    } catch (e) {
        console.log("Authentication failed:", e);
        _authError()
    }

    function _authError() {
        res.status(403).send('Invalid Login');
    }

}