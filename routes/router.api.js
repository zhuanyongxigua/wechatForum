/**
 * Created by yuxin on 2018/1/26.
 */

var express = require('express');
var fs = require('fs');
var multer = require('multer');
var passport = require('passport');
var upload = multer({ dest: 'uploads/' });

var PostModel = require('../models/post');
var imagesModel = require('../models/imgUpload');
var UserModel = require('../models/user');
var Verify = require('../middleware/verify');
var router = express.Router();



router.get('/', (req, res, next) => {

})
    .post('/getRoleType', (req, res, next) => {
        res.json([
            {
                code: null,
                id: 70,
                name: "运动",
                pcode: null,
                status: true,
                type: "TopicType"
            },
            {
                code: null,
                id: 71,
                name: "旅游",
                pcode: null,
                status: true,
                type: "TopicType"
            },
            {
                code: null,
                id: 72,
                name: "随拍",
                pcode: null,
                status: true,
                type: "TopicType"
            }
        ]);
    })
    .put('/addUserPost', (req, res, next) => {
        var post = new PostModel();
        post.title = req.body.title;
        post.content = req.body.content;
        post.type = req.body.type;
        post.tFileVos = req.body.tFileVos;
        post.typeCode = req.body.typeCode;
        // console.log(req);
        post.save((err, doc) => {
            res.json({success: true})
        });
    })

    .post('/getPostList', (req, res, next) => {
        console.log(req);
        let fnGetCount = new Promise((resolve, reject) => {
            PostModel.count({}, (err, c)=> err ? reject(err) : resolve(c))
        });
        fnGetCount.then(resp => {

            PostModel.find({
                content: new RegExp(req.body.param.topicVo.queryStr, "i"),
                title: new RegExp(req.body.param.topicVo.queryStr, "i"),
                typeCode: req.body.param.topicVo.typeCode
            }, {}, (err, posts) => {
                let aPosts = [...posts];
                if (err) {
                    res.json({success: false, message: err});
                    return;
                }
                aPosts.forEach((ele, index) => {
                    ele._doc.id = ele.id;
                    if (ele._doc.tFileVos) {
                        let newTFileVos = ele._doc.tFileVos.map((element) => {
                            if (element) {
                                element.type = 1;
                                element.path = element.id;
                                return element;
                            } else {
                                return {type: 1};
                            }
                        })
                        ele._doc.tFileVos = newTFileVos;
                    }
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
                res.json({success: false, message: err});
                return
            }
            console.log(doc);
            res.json({
                success: true,
                path: doc._id,
                id: doc._id,
                result: {

                }
            });
        });
    })
    .get('/getImage/:id', (req, res, next) => {
        imagesModel.findById(req.params.id, (err, doc) => {
            if (err) {
                res.json({success: false, message: err});
                return;
            }
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
        })
    })
    .get('/auth/github', passport.authenticate('github'))
    .get('/auth/github/callback', (req, res, next) => {
        console.log("callback");
        /*
        *这里应该还会向github发一次请求，用code取回token，取回的回调函数在strategy时写的回调函数中
        *这里的这个'github'也相当于是一个中间件，作用就是上面这句话，在回调了strategy之后，再次回调，就是后面写的这个函数了
        *重定向之后带code的GET发到这个接口--'github'发请求到github去accesstoken回调strategy中的那个函数--回调'github'后面写的那个函数，进而返回给client
        *strategy中的回调函数的第四个参数cb就是'github'后面的那个函数
        */
        passport.authenticate('github', (err, user, info) => {
            console.log("callbackGithub");
            if (err) {
                return next(err);
            }
            if (!user) {
                  return res.status(401).json({
                    err: info
                  });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
                var token = Verify.getToken(user);
                res.status(200).json({
                    status: 'Login successful!',
                    success: true,
                    token: token
                });
            });
        })(req,res,next);
    });

module.exports = router;
