import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';
import * as db from '../data/db'

export const getRoleType = (req, res, next) => {
    try {
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
    } catch(err) {
        next(err);
    }
}

export const getRechargeRule = (req, res, next) => {
    try {
        res.json([
            {
                createDate : 1516761081000,
                id : 18,
                integral : 1000,
                money : 0.01,
                type : 1
            },
            {
                createDate : 1516761081000,
                id : 18,
                integral : 2000,
                money : 0.02,
                type : 1
            },
            {
                createDate : 1516761081000,
                id : 18,
                integral : 3000,
                money : 0.03,
                type : 1
            },
            {
                createDate : 1516761081000,
                id : 18,
                integral : 4000,
                money : 0.04,
                type : 1
            },
            {
                createDate : 1516761081000,
                id : 18,
                integral : 5000,
                money : 0.05,
                type : 1
            },
            {
                createDate : 1516761081000,
                id : 18,
                integral : 6000,
                money : 0.06,
                type : 1
            },
        ])
    } catch(err) {
        next(err);
    }
}