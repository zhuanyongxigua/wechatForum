import R from 'ramda';
import PostModel from '../models/post';
import UserModel from '../models/user';
import RoleTypeModel from '../models/roleType';
import * as db from '../data/db'

export const addRoleType = (req, res, next) => {
    try {
        let oRoleType = new RoleTypeModel();
        oRoleType.code = req.body.code;
        oRoleType.id = req.body.id;
        oRoleType.name = req.body.name;
        oRoleType.pcode = req.body.pcode;
        oRoleType.status = req.body.status;
        oRoleType.type = req.body.type;
        oRoleType.isDel = false;
        oRoleType.save((err, doc) => {
            res.json({
                success: true
            })
        })
    } catch(err) {
        next(err);
    }
}

export const getRoleType = async (req, res, next) => {
    try {
        let oRoleType = await db.find(RoleTypeModel)({})({});
        res.json(oRoleType);
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