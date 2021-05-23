const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

var articlesController = require('../controllers/articles');

router.use(bodyParser.json());

/*
Router for  /api/v1/auth

POST /login   - login in portal
POST /refreshToken - check refreshToken
 */

router.get('/articles', articlesController.export);
router.get('/articles/:id', articlesController.exportOne);

module.exports = router;
