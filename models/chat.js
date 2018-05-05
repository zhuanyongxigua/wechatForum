import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    content: String,
    githubId: String,
    avatar: String,
    username: String,
    isDel: String
}, {
    timestamps: true
});

let ChatModel = mongoose.model('Chat', ChatSchema);

export default ChatModel;