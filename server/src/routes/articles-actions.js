const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

var artclesController = require('../controllers/articles');

router.use(bodyParser.json());

/*
Router for  /api/v1/articles

GET /       - get all Articles
GET /:id    - read one Article
PUT /:id    - update one article
POST /      - create Article
DELETE /:id - delete Article
 */

router.get('/', artclesController.getArticles);
router.get('/:id', artclesController.articleReadOne);
router.put('/:id', artclesController.articleUpdateOne);
router.post('/', artclesController.articleCreate);
router.delete('/:id', artclesController.articleDeleteOne);

module.exports = router;
