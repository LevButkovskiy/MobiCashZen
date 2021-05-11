const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

var artclesController = require('../controllers/articles');

router.use(bodyParser.json());

/*
Router for  /api/v1/auth

POST /login   - login in portal
POST /refreshToken - check refreshToken
 */

router.get('/', artclesController.getArticles);
router.post('/', artclesController.articleCreate);
router.delete('/:id', artclesController.articleDeleteOne);

module.exports = router;
