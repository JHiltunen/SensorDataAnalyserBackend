const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

var storage = multer.diskStorage(
  {
      destination: './uploads/',
      filename: function ( req, file, cb ) {
          cb( null, file.originalname );
      }
  }
);

var upload = multer( { storage: storage } );

router.route('/')
  .post(upload.single('file'), uploadController.upload_json_file);

module.exports = router;