import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';
import * as db from '../data/db'

export const myInfo = async (req, res, next) => {
    try {
        let oUserModelData = await db.find(UserModel)({githubId: req.decoded.githubId})({});
        res.json({
            username: oUserModelData[0].username,
            avatar: oUserModelData[0].avatar,
            githubId: req.decoded.githubId,
            reward: oUserModelData[0].reward
        });
    } catch(err) {
        next(err);
    }
}

export const getScoreList = (req, res, next) => {
    try {
        res.json([
            {
                createDate:"2018-02-26 10:17:45",
                credit:10,
                id:100,
                money:null,
                number:null,
                path:1,
                queryDateQ:null,
                queryDateZ:null,
                queryStr:null,
                reason:"发帖",
                type:5,
                userId:25,
                username:null
            }
        ])
    } catch(err) {
        next(err);
    }
}

export const recharge = (req, res, next) => {
    try {
        let oUserModelData = db.update(UserModel)({githubId: req.decoded.githubId})({$inc: {reward: req.body.integral}});
        if (oUserModelData.length != 0) {
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    } catch(err) {
        next(err);
    }
}

export const withdraw = (req, res, next) => {
    try {
        let oUserModelData = db.update(UserModel)({githubId: req.decoded.githubId})({$inc: {reward: req.body.integral}});
        if (oUserModelData.length != 0) {
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    } catch(err) {
        next(err);
    }
}