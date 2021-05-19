const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require('multer');

var ctrlUploads = require('../controllers/uploads');

const uploadImage = multer({dest: './uploads/images'});

var storage = multer.diskStorage({
  destination: './uploads/files',
  filename: function(req, file, callback) {
    let fileNameArr = file.originalname.split('.');
    let extension = fileNameArr[fileNameArr.length - 1]
    callback(null, Date.now() + '.' + extension);
  }
});
const uploadFile = multer({ storage: storage });

router.use(bodyParser.json());

/*
Router for  /api/v1/people

GET /:type/:id    - read image/file by id
POST /save/image  - save image
POST /save/file   - save file
 */

router.get('/:type/:id', ctrlUploads.getFile);
router.post('/save/image', uploadImage.single('file'), ctrlUploads.saveImage);
router.post('/save/file', uploadFile.single('file'), ctrlUploads.saveFile);

module.exports = router;
