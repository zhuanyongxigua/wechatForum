import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let SupportSchema = new Schema({
    githubId: String,
    avatar: String
}, {
    timestamps: true
})

let PostSchema = new Schema({
    title: String,
    content: String,
    type: String,
    typeCode: Number,
    tFileVos: Array,
    avatar: String,
    username: String,
    support: [SupportSchema]
}, {
    timestamps: true
});

let PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
