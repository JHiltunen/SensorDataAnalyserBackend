const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
router.route('/')
  .get(fileController.read_file_names);

module.exports = router;