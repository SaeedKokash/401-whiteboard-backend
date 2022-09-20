'use strict';

const express = require('express');
const { signup, allUser, signin } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');
const router = express.Router();
const bearerAuth = require('../middlewares/bearer-auth')

// we can use this instead
// const router = require('express').Router();

router.post('/signup', userAuth.userAuth, signup)
router.get('/users', bearerAuth, allUser)
router.post('/signin', signin)

module.exports = router;