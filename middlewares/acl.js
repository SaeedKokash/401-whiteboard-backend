'use strict';

// creating a middleware to implement the acl by passing the capability as an argument which returns if the user role includes that capability
const acl = (capability) => {
    return (req, res, next) => {
        // console.log(req.user.capabilities);
        try {
            // check if the user has the capability or the user is the owner of the post and check params for the delete route
            // console.log(req.params.userID);
            // console.log(req.user.id);
            if (req.user.capabilities.includes(capability) || req.user.id == req.body.userID || req.user.id == req.params.userID){
                // console.log(req.user.id)
                // console.log(req.body)
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
