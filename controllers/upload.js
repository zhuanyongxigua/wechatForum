import R from 'ramda';
import fs from 'fs';
import imagesModel from '../models/imgUpload';
import * as db from '../data/db'

export const uploadImage = async (req, res ,next) => {
    try {
        let imgUpload = new imagesModel();
        imgUpload.img.data = fs.readFileSync(req.files[0].path)
        imgUpload.img.contentType = req.files[0].mimetype;
        let oImgUpload = await imgUpload.save();

        res.json({
            success: true,
            path: oImgUpload._id,
            id: oImgUpload._id,
            result: {}
        })
    } catch (err) {
        next(err);
    }
}

export const getImage = async (req, res, next) => {
    try {
        let oImageModel = await db.findById(imagesModel)(req.params.id);
        res.contentType(oImageModel.img.contentType);
        res.send(oImageModel.img.data);
    } catch(err) {
        next(err);
    }
}

