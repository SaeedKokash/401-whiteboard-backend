'use strict';

const { userModel } = require('../models/index');

const bearerAuth = async (req, res, next) => {
   console.log('from inside the middleware');
   if(!req.headers.authorization) {
    next('You are not Authorized')
   }
   const token = req.headers.authorization.split(' ').pop();

    try {
        const validUser = await userModel.authenticateToken(token);
        const userInfo = await userModel.findOne({ where: { userName: validUser } });
        if(userInfo) {
            req.user = userInfo;
            req.token = token;
            next();
        } else {
            next('Invalid Login');
        }
    } catch (error) {
        next(error.message);
    }
}


module.exports = bearerAuth;