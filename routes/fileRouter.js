const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
// localhost:8080/files
router.route('/')
  .get(fileController.read_file_names);

// localhost:8080/files/monthData
router.route('/monthData')
  .get(fileController.read_month_data); 

router.route('/read')
  .get(fileController.read_file);

module.exports = router;