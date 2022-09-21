'use strict';

const express = require('express');
const { signup, allUser, signin } = require('../controllers/userControllers');
const router = express.Router();

const basicAuth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth')

// we can use this instead
// const router = require('express').Router();

router.post('/signup', basicAuth, signup)
router.get('/users', bearerAuth, allUser)
router.post('/signin', signin)

module.exports = router;