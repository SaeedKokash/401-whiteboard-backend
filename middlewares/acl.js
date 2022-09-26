'use strict';

const { userModel } = require('../models/index');


// creating a middleware to implement the acl by passing the capability as an argument which returns if the user role includes that capability
const acl = (capability) => {
    return (req, res, next) => {
        // console.log(req.user.capabilities);
        try {
            if (req.user.capabilities.includes(capability)) {
                next();
            } else {
                next(`Access Denied for ${capability}`);
            }
        } catch (error) {
            next('You Are not Allowed to do this');
        }
    };
};


module.exports = acl;
