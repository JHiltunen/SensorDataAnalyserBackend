const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage, 
  fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(json)$/)) { 
     // upload only json format
     return cb(new Error('Please upload a json file'))
   }
    cb(undefined, true)
  },}
);

router
  .route('/')
  .post(upload.single('file'), uploadController.upload_json_file);

module.exports = router;
