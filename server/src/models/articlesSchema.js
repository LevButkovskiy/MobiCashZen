var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Translation = require('./subSchemas/translationSchema');

var articlesSchema = new mongoose.Schema({
  title:          {type: Translation, required: true},
  rteData:        {type: Translation, required: true},
  tags:           [{title: String}],
  props:          [String]
});

articlesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Articles', articlesSchema, 'articles');
