import * as multerConfig from 'multer';

const storage = multerConfig.memoryStorage();

export const multer = multerConfig.default({
    storage: storage,                           // set the storage (in this case in memory and when the request finishes garbage collector will clear it)
    fileFilter: multerFilter,                   // set to accept only jpeg or png 
    limits: {                                   // limit the size to 3mb and only 1 file
        fileSize: 3000000,
        files: 1
    }
});

function multerFilter(req, file, cb) {
    const mimetype = file.mimetype;

    if (mimetype == 'image/jpeg' || mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('The image format should be jpeg or png'));
    }
}

//When encountering an error, Multer will delegate the error to Express