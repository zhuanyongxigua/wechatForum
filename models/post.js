var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    content: String,
    type: String,
    tFileVos: Array
});

var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
