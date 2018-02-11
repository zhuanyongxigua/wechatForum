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
            PostModel.find({}, {}, (err, posts) => {
                let aPosts = [...posts];
                if (err) {
                    res.json({ success: false });
                    return;
                }
                console.log(JSON.parse(JSON.stringify(aPosts)));
                aPosts.map((ele, index) => {
                    console.log(ele);
                    ele.id = ele._id
                });
                console.log(JSON.parse(JSON.stringify(aPosts)));
                res.json({ total: resp, rows: aPosts});
            });
        })
    })

module.exports = router;
