var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    githubId: String,
    OauthId: String,
    OauthToken: String
});

UserSchema.plugin(findOrCreate);

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
