var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imgSchema = new Schema({
    img: { data: Buffer, contentType: String },
    isDel: Boolean
});

var imagesModel = mongoose.model('Image', imgSchema);

export default imagesModel;
