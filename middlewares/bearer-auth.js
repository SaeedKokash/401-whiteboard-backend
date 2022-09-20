'use strict';

const User = require('../models/user.model');
const { userModel } = require('../models/index');

const bearerAuth = async (req, res, next) => {
   console.log('from inside the middleware');
   if(!req.headers.authorization) {
    next('You are not Authorized')
   }
   const token = req.headers.authorization.split(' ').pop();

    try {
        const validUser = await User.authenticateToken(token);

        // console.log(validUser)  
        const userInfo = await userModel.findOne({ where: { userName: validUser.userName } });
        // console.log(userInfo)  
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