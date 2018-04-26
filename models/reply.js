import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ReplySchema = new Schema({
    postId: String,
    autherId: String,
    replyId: String,
    content: String
}, {
    timestamps: true
});

let ReplyModel = mongoose.model('Reply', ReplySchema);

export default ReplyModel;
