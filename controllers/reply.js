import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';
import ReplyModel from '../models/reply';
import * as db from '../data/db'

export const editCmt = async (req, res, next) => {
    try {
        if (req.body.postId) {
            let oUserModel = await db.find(UserModel)({githubId: req.decoded.githubId})({});
            let reply = new ReplyModel();
            reply.postId = req.body.postId;
            reply.autherId = oUserModel[0].id;
            reply.content = req.body.content;
            reply.avatar = oUserModel[0].avatar;
            reply.githubId = req.decoded.githubId;
            reply.isDel = false;
            reply.save((err, doc) => res.json({success: true}));
        } else {
            let oReplyModel = await db.findOneById(ReplyModel)(req.body.id);
            let sMessage = '';
            let isSuccess = true;
            if (oReplyModel.length !== 0) {
                let oReplyModel = await db.update(ReplyModel)({'_id': req.body.id})({'$set': {content: req.body.content}});
                isSuccess = true;
            } else {
                sMessage = "未找到此评论";
                isSuccess = false;
            }
            res.json({
                success: isSuccess,
                message: sMessage
            })
        }
    } catch(err) {
        next(err);
    } 
}

export const getCmtList = async (req, res, next) => {
    try {
        let oPostModel = await db.findOneById(PostModel)(req.query.id);
        let options = {
            skip: req.query.currentPage === '1' ? 5 : (req.query.currentPage - 1) * req.query.pageSize,
            limit: parseFloat(req.query.pageSize),
            sort: '-createAt'
        }
        let oReplyModel = await db.find(ReplyModel)({postId: req.query.id})(options);
        oReplyModel.map(ele => {
            if (ele.githubId === req.decoded.githubId) {
                ele._doc.isOwn = true;
            } else {
                ele._doc.isOwn = false;
            }
            return ele;
        })
        res.json(oReplyModel);
    } catch (err) {
        next(err);
    }

}

export const deleteCmt = async (req, res, next) => {
    try {
        let oReplyModel = await db.update(ReplyModel)({'_id': req.body.id})({'$set': {isDel: true}});
        res.json({success: true});
    } catch (err) {
        next(err);
    }
}