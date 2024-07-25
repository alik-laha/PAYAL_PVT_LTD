import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import path from 'path';

let storage

export const EmployeeImageUpload = (req: Request, res: Response, next: NextFunction) => {
    console.log('EmployeeImageUpload')
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/employeeImages/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    });

    const upload = multer({ storage }).fields([
        { name: 'employeeImage', maxCount: 1 },
    ]);

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error uploading file', error: err });
        }
        next();
    });
};

export const graddingCleanFunction = () => {
    //graddingMaintenence clean image upload
    const graddingClean = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/clean/cleanigGradding/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    })
    storage = graddingClean
    const upload = multer({ storage, }).fields([
        { name: 'cleanedPartsImages', maxCount: 10 },
        { name: 'damagedPartsImages', maxCount: 10 },
    ])
    return upload
}

export const ScoopingSectionCuttingFunction = () => {
    const CuttingClean = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/clean/cleaningScoopingSectionCutting/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    })
    storage = CuttingClean
    const upload = multer({ storage, }).fields([
        { name: 'cleanedPartsImages', maxCount: 10 },
        { name: 'damagedPartsImages', maxCount: 10 },
    ])
    return upload
}

export const boilingCleanFunction = () => {
    //boillingMaintenence clean image upload
    const boillingClean = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/clean/cleaningBoilling/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    })
    storage = boillingClean
    const upload = multer({ storage, }).fields([
        { name: 'cleanedPartsImages', maxCount: 10 },
        { name: 'damagedPartsImages', maxCount: 10 },
    ])
    return upload

}