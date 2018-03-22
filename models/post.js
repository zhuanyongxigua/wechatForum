var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    content: String,
    type: String,
    typeCode: Number,
    tFileVos: Array,
    avatar: String
});

var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
