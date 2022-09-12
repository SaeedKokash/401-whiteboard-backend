'use strict';

module.exports = (err, req, res, next) => {
    res.status(404).send({
        code: 500,
        message: `Page Not Found`
    });
};