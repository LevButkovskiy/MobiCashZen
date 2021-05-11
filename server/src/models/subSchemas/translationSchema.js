var mongoose = require('mongoose');

var translationSchema = new mongoose.Schema(
    {
        "ru": String,
        "en": {type: String, required: true}
    }, { _id : false }
);


module.exports = translationSchema;
