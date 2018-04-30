import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';
import ReplyModel from '../models/reply';
import * as db from '../data/db'

export const addCmt = async (req, res, next) => {
    try {
        let oUserModel = await db.find(UserModel)({githubId: req.decoded.githubId})({});
        var reply = new ReplyModel();
        reply.postId = req.body.postId;
        reply.autherId = oUserModel[0].id;
        reply.content = req.body.content;
        reply.avatar = oUserModel[0].avatar;

        reply.save((err, doc) => {
            res.json({success: true})
        });
    } catch(err) {
        next(err);
    } 
}

export const getCmtList = async (req, res, next) => {
    let options = {
        skip: req.query.currentPage === '1' ? 5 : (req.query.currentPage - 1) * req.query.pageSize,
        limit: parseFloat(req.query.pageSize),
        sort: '-createAt'
    }
    try {
        let oReplyModel = await db.find(ReplyModel)({postId: req.query.id})(options);
        res.json(oReplyModel);
    } catch (err) {
        next(err);
    }

}

export const deleteCmt = async (req, res, next) => {
    try {
        if (req.body.id === 'all') {
            let oPostModel = await db.remove(PostModel)({});
            res.json({success: true});
        } else if ('id' in req.body) {
            let oPostModel = await db.remove(PostModel)({id: req.body.id});
            res.json({success: true});
        }
    } catch (err) {
        next(err);
    }
}