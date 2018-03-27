import R from 'ramda';
import fs from 'fs';
import path from 'path';
import imagesModel from '../models/imgUpload';
import * as db from '../data/db'

export const uploadImage = async (req, res ,next) => {
    try {
        let imgUpload = new imagesModel();
        imgUpload.img.data = fs.readFileSync(req.files[0].path)
        imgUpload.img.contentType = req.files[0].mimetype;
        let oImgUpload = await db.save(imgUpload);
        fs.rmdirSync(req.files[0].path);
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

