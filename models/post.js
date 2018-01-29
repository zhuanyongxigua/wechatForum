var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    content: String
});

var PostModel = mongoose.model('Post', PostSchema);

module.export = PostModel;
