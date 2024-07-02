import multer from 'multer';

//graddingMaintenence clean image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/clean/graddingclean/');
    },
    filename: function (req, file, cb) {
        const formattedDate = new Date().toISOString().replace(/:/g, '-');
        cb(null, file.originalname + "-" + formattedDate);
    }
})
export const graddingCleanImageUpload = multer({ storage })


