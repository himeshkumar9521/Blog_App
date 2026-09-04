const multer = require('multer');


// storage
const storage = multer.diskStorage({});


// file filter
const fileFilter = (req, file, cb) => {

    // allowed image types
    const allowedTypes = [

        'image/png',

        'image/jpeg',

        'image/jpg',

        'image/webp'

    ];

    // check type
    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(

            new Error(
                'Only images are allowed'
            ),

            false

        );

    }

};


// multer config
const upload = multer({

    storage,

    fileFilter,

    limits: {

        // 2MB limit
        fileSize: 2 * 1024 * 1024

    }

});

module.exports = upload;