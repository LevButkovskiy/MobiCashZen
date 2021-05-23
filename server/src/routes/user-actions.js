const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

var userController = require('../controllers/user');

router.use(bodyParser.json());

/*
Router for  /api/v1/auth

POST /login   - login in portal
POST /refreshToken - check refreshToken
 */

router.get('/', userController.getUsers);
router.put('/history', userController.userUpdateHistoryOfView);
router.get('/read', userController.userReadOne);
router.put('/:id', userController.userUpdateOne);
router.post('/', userController.userCreate);
router.delete('/:id', userController.userDeleteOne);

module.exports = router;
