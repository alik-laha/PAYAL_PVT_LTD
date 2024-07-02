import multer from 'multer';

let storage

export const graddingCleanFunction = () => {
    //graddingMaintenence clean image upload
    const graddingClean = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/clean/graddingclean/');
        },
        filename: function (req, file, cb) {
            const formattedDate = new Date().toISOString().replace(/:/g, '-');
            cb(null, file.originalname + "-" + formattedDate);
        }
    })
    storage = graddingClean
    return multer({ storage })
}


export const boilingCleanFunction = () => {
    //boillingMaintenence clean image upload
    const boillingClean = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/clean/boillingclean/');
        },
        filename: function (req, file, cb) {
            const formattedDate = new Date().toISOString().replace(/:/g, '-');
            cb(null, file.originalname + "-" + formattedDate);
        }
    })
    storage = boillingClean
    return multer({ storage })

}