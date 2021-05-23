const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

var userController = require('../controllers/user');

router.use(bodyParser.json());

/*
Router for  /api/v1/auth

GET /           - get all Users
PUT /history    - put history of view on User
GET /read       - read User by link
PUT /:id        - update User
POST /          - create User
DELETE /:id     - delete User
 */

router.get('/', userController.getUsers);
router.put('/history', userController.userUpdateHistoryOfView);
router.get('/read', userController.userReadOne);
router.put('/:id', userController.userUpdateOne);
router.post('/', userController.userCreate);
router.delete('/:id', userController.userDeleteOne);

module.exports = router;
