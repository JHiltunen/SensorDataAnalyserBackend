const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.route('/')
  .post(uploadController.upload_json_file);

module.exports = router;