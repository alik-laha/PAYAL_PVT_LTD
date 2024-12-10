
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../uploads/QcPackageMaterial');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });
  
  const upload = multer({ storage }).fields([
    { name: 'foodGradeCertificate', maxCount: 1 },
    { name: 'coaCertificate', maxCount: 1 },
    { name: 'damagePartsImage', maxCount: 10 },
  ]);

const QualityPackageMetrialMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        upload(req, res, (err) => {
          if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'Error uploading file', error: err.message });
          }
          next();
        });
      } catch (err) {
        console.error('Middleware error:', err);
        res.status(500).json({ message: 'Unexpected error', error: err });
      }
}
export default QualityPackageMetrialMiddleWare;