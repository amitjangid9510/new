const multer = require('multer');
const os = require('os');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware function to handle file uploads
const uploadMiddleware = upload.single('avatar'); 

module.exports = uploadMiddleware;
