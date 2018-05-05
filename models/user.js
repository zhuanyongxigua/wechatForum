var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var bountyUser = new Schema({
    reward: Number,
    githubId: String
})

var UserSchema = new Schema({
    githubId: String,
    OauthId: String,
    OauthToken: String,
    avatar: String,
    username: String,
    reward: Number,
    isDel: String,
    rewardFrom: [bountyUser]
});

UserSchema.plugin(findOrCreate);

var UserModel = mongoose.model('User', UserSchema);

export default UserModel;