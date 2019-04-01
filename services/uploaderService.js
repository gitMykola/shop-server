const multer = require('multer');

/*Uploader will upload to 'public/uploads/' directory,
 * files name will be 'goods_' + current date
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        cb(null, 'goods_' + Date.now()
            + '.' + file.originalname.split('.').pop());
    }
});
/*Uploader accept only 'jpeg' & 'png' format
 */
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
        ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/*Set maximal uploaded file size up to 9M*/

module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 9
    },
    fileFilter: fileFilter
});