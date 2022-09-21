'use strict';

const User = require('../models/index').userModel;

const basicAuth = async (req, res, next) => {
    try {

        // we need to search for username in the Database
        const userName =  await User.findOne({
            where: {userName: req.body.userName}
        })

        if (userName) {
            return res.status(409).send('Username already exists')
        }
    
        // we need to search for the email in the Database
        const email =  await User.findOne({
            where: {email: req.body.email}
        })

        if (email) {
            return res.status(409).send('Email already exists')
        }
    
        next();

    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = basicAuth;
