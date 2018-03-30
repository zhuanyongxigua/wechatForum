/**
 * Created by yuxin on 2018/1/26.
 */
import R from 'ramda';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import passport from 'passport';
const uploadMulter = multer({ dest: 'uploads/' });

import PostModel from '../models/post';
import imagesModel from '../models/imgUpload';
import UserModel from '../models/user';
import * as Verify from '../middleware/verify';
import * as post from '../controllers/post';
import * as upload from '../controllers/upload'
import * as user from '../controllers/user'
import * as dictionary from '../controllers/dictionary'
const router = express.Router();
const config = require('../config');

const opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
};

router.get('/', (req, res, next) => {})
    .post('/getRoleType', dictionary.getRoleType)
    .post('/getScoreList', user.getScoreList)
    .post('/getRechargeRule', dictionary.getRechargeRule)
    .post('/recharge', Verify.verifyOrdinaryUser, user.recharge)
    .post('/withdraw', Verify.verifyOrdinaryUser, user.withdraw)
    .put('/addUserPost', Verify.verifyOrdinaryUser, post.addUserPost)
    .post('/getPostList', post.getPostList)
    .get('/getPostDtl', post.getPostDtl)
    .delete('/deletePostModel', post.deletePostModel)
    .patch('/support', Verify.verifyOrdinaryUser, post.support)
    .post('/uploadImage', uploadMulter.array('file', 12), upload.uploadImage)
    .get('/getImage/:id', upload.getImage)
    .get('/auth/github', passport.authenticate('github'))
    .get('/auth/github/callback', (req, res, next) => {
        /*
        *这里应该还会向github发一次请求，用code取回token，取回的回调函数在strategy时写的回调函数中
        *这里的这个'github'也相当于是一个中间件，作用就是上面这句话，在回调了strategy之后，再次回调，就是后面写的这个函数了
        *重定向之后带code的GET发到这个接口--'github'发请求到github去accesstoken回调strategy中的那个函数--回调'github'后面写的那个函数，进而返回给client
        *strategy中的回调函数的第四个参数cb就是'github'后面的那个函数
        */
        passport.authenticate('github', (err, user, info) => {
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
                res.cookie("configauthCookieName", token, opts);
                res.redirect(config.github.redirectURL);
            });
        })(req,res,next);
    })
    .post('/myInfo', Verify.verifyOrdinaryUser, user.myInfo);

export default router;
