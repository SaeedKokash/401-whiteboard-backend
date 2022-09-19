'use strict';

const express = require('express');
const { signup, allUser, signin } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');
const router = express.Router();

// we can use this instead
// const router = require('express').Router();

router.post('/signup', userAuth.userAuth, signup)
router.get('/users', allUser)
router.post('/signin', signin)

module.exports = router;