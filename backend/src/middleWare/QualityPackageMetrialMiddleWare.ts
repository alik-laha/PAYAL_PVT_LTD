import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import path from 'path';


const QualityPackageMetrialMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads/QcPackageMaterial/');
            },
            filename: (req, file, cb) => {
                if (file.fieldname === 'foodGradeCirtiFicateFile') {
                    if (!file.originalname.match(/\.(pdf)$/)) {
                        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                        cb(null, `foodGradeCirtiFicateFile-${uniqueSuffix}${path.extname(file.originalname)}`);
                    }
                }
                if (file.fieldname === 'coaCirtificateFile') {
                    if (!file.originalname.match(/\.(pdf)$/)) {
                        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                        cb(null, `coaCirtificateFile-${uniqueSuffix}${path.extname(file.originalname)}`);
                    }
                }
                if (file.fieldname === 'damageFile') {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
                }
            }
        });

        const upload = multer({ storage }).fields([
            { name: 'foodGradeCirtiFicateFile', maxCount: 1 },
            { name: 'coaCirtificateFile', maxCount: 1 },
            { name: 'damageFile', maxCount: 10 }
        ]);

        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ msg: 'Error uploading file', error: err });
            }
            next();
        });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default QualityPackageMetrialMiddleWare;