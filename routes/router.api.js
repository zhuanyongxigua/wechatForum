/**
 * Created by yuxin on 2018/1/26.
 */

var express = require('express');
var PostModel = require('../models/post');
var imagesModel = require('../models/imgUpload');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
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
                    res.json({success: false });
                    return;
                }
                aPosts.map((ele, index) => {
                    ele._doc.id = ele.id
                });
                res.json({ total: resp, rows: aPosts});
            });
        })
    })
    .post('/uploadImage', upload.array('file', 12), (req, res, next) => {
        var imgUpload = new imagesModel();
        imgUpload.img.data = fs.readFileSync(req.files[0].path)
        imgUpload.img.contentType = req.files[0].mimetype;
        imgUpload.save((err, doc) => {
            if (err) {
                console.log(err);
                return
            }
            console.log(doc);
            res.json({success: true});

        });
    })

module.exports = router;
