var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Translation = require('./subSchemas/translationSchema');

var articlesSchema = new mongoose.Schema({
  author:         {en: String, ru: String},
  title:          {type: Translation, required: true},
  rteData:        {type: Translation, required: true},
  description:    {ru: String, en: String},
  tags:           [{title: String}],
  imagePath:      String,
  internal:       {type: Boolean, default: true},
  props:          [String]
});

articlesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Articles', articlesSchema, 'articles');
