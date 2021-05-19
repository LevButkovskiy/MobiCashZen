var fs = require('fs');
var path = require('path');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var sendOk = (res, content) => {
    console.log(content);
    sendJSONresponse(res, 200, content);
}

var sendErr = (res, err) => {
    console.log(err);
    sendJSONresponse(res, 404, err)
}

module.exports.getFile = function (req, res) {
    let type = req.params.type;
    let id = req.params.id;
    res.sendFile(path.join(__dirname, '../../uploads/' + req.params.type + '/' + id));
}

module.exports.saveImage = function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return sendErr(res, {
            error: {
                key: "ERROR_TRY_AGAIN_LATER",
                message: "No file received"
            }
        });
    } else {
        console.log('file received');
        return sendOk(res, {
            imagePath: req.file.path
        });
    }
}

module.exports.saveFile = function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return sendErr(res, {
            error: {
                key: "ERROR_TRY_AGAIN_LATER",
                message: "No file received"
            }
        });
    } else {
        console.log('file received');
        return sendOk(res, {
            filePath: req.file.path
        });
    }
}

//Internal function. Deleting file/image from server
module.exports.deleteFile = function (path) {
    fs.unlink(path, (err) => {
        if(err) {
            return console.log('error with deleting file/image:', err);
        }
        else {
            return console.log('file/image deleted');
        }
    })
}
