/**
 * Created by yuxin on 2018/1/26.
 */

var express = require('express');
var PostModel = require('../models/post')
var router = express.Router();

router.get('/', (req, res, next) => {

})
    .post('/getRoleType', (req, res, next) => {
        res.json([{
            code: null,
            id: 70,
            name: "运动",
            pcode: null,
            status: true,
            type: "TopicType"
        }]);
    })
    .put('/addUserPost', (req, res, next) => {
        var post = new PostModel();
        post.title = req.body.title;
        post.content = req.body.content;
        post.type = req.body.type;
        post.tFileVos = req.body.tFileVos;
        // console.log(req);
        post.save((err, doc) => {
            res.json({success: true})
        });
    })
    .post('/getPostList', (req, res, next) => {
        let fnGetCount = new Promise((resolve, reject) => {
            PostModel.count({}, (err, c)=> err ? reject(err) : resolve(c))
        });
        fnGetCount.then(resp => {
            console.log(resp);
            PostModel.find({}, {}, (err, posts) => {
                if (err) {
                    res.json({ success: false });
                    return;
                }
                res.json({
                    pageNum: 1,
                    pageSize: 10,
                    pages: 2,
                    rows: posts,
                    total: resp
                });
            });
        })
    })

module.exports = router;
