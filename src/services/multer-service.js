import fs from 'fs-extra';
import multer from 'multer';

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.diskStorage({
    destination(req, file, cb) {

        if (!allowedFileTypes.includes(file.mimetype))
            cb({message: 'Unsupported file format'}, false);

        fs.mkdirsSync('files');

        cb(null, './files/');

        setTimeout(() => {
            fs.emptyDirSync('files/');
        }, 100000 * 2)

    },

    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

export default upload;
