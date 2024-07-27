import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import path from 'path';


const QualityPackageMetrialMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
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

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default QualityPackageMetrialMiddleWare;