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
        reply.save((err, doc) => {
            res.json({success: true})
        });
    } catch(err) {
        next(err);
    } 
}

export const getCmtList = async (req, res, next) => {
    try {
        let options = {
            skip: (req.body.currentPage - 1) * req.body.pageSize,
            limit: req.body.pageSize,
            sort: '-createAt'
        }

        let fnGetCount = new Promise((resolve, reject) => {
            PostModel.count({}, (err, c)=> err ? reject(err) : resolve(c))
        });

        let oPostModel = await db.find(PostModel)({
            content: new RegExp(req.body.param.topicVo.queryStr, "i"),
            title: new RegExp(req.body.param.topicVo.queryStr, "i"),
            typeCode: req.body.param.topicVo.typeCode || {$gt: 0, $lt: 100}
        })(options);

        let aPosts = [...oPostModel];
        aPosts.map(ele => ele._doc.id = ele.id);

        res.json({ total: (await fnGetCount), rows: aPosts});
    } catch(err) {
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