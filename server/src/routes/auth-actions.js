const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

var authController = require('../controllers/auth');

router.use(bodyParser.json());

/*
Router for  /api/v1/auth

POST /login   - login in portal
POST /refreshToken - check refreshToken
 */

router.post('/login', authController.userLogin);
router.post('/refreshToken', authController.checkRefreshToken);

module.exports = router;
