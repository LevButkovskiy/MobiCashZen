var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Translation = require('./subSchemas/translationSchema');

var userSchema = new mongoose.Schema({
    linkTx:        {type: String},
    groupId:       Number,
    role:          String,
    historyOfView: [
        {
            articleId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Articles'},
            lastPos:    Number,
            percentage: Number,
            isLiked:    Boolean
        }
    ]
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema, 'user');
