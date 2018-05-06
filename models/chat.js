import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    content: String,
    githubId: String,
    avatar: String,
    username: String,
    isDel: Boolean
}, {
    timestamps: true
});

let ChatModel = mongoose.model('Chat', ChatSchema);

export default ChatModel;