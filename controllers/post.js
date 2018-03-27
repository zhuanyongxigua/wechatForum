import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';
import * as db from '../data/db'

export const addUserPost = async (req, res, next) => {
    try {
        let oUserModel = await db.find(UserModel)({githubId: req.decoded.githubId})({});
        var post = new PostModel();
        post.title = req.body.title;
        post.content = req.body.content;
        post.type = req.body.type;
        post.tFileVos = req.body.tFileVos;
        post.tFileVos.map((ele) => {
            ele.path = 'http://' + req.headers.host + '/api/getImage/' + ele.id;
            ele.type = 1;
            return ele;
        })
        post.typeCode = req.body.typeCode;
        post.avatar = oUserModel[0].avatar;
        post.save((err, doc) => {
            res.json({success: true})
        });
    } catch(err) {
        next(err);
    } 
}

export const getPostList = async (req, res, next) => {
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

export const getPostDtl = async (req, res, next) => {
    try {
        let oPostModel = await db.findById(PostModel)(req.query.id);
        res.json({ success: true, row: oPostModel});
    } catch (err) {
        next(err);
    }
}

export const deletePostModel = async (req, res, next) => {
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