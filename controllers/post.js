import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';

export const addUserPost = async (req, res, next) => {
    UserModel.find({githubId: req.decoded.githubId}, (err, user) => {
        var post = new PostModel();
        post.title = req.body.title;
        post.content = req.body.content;
        post.type = req.body.type;
        post.tFileVos = req.body.tFileVos;
        post.typeCode = req.body.typeCode;
        post.avatar = user[0].avatar;
        // console.log(req);
        post.save((err, doc) => {
            res.json({success: true})
        });
    })
}