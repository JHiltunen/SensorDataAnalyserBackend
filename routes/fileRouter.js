const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
// localhost:8080/files
router.route('/').get(fileController.map_file_names_to_months);

router.route('/monthDataMath').get(fileController.calculate_month_data);

router.route('/read').get(fileController.read_file);

router.route('/recent').get(fileController.get_most_recent_average);

router
  .route('/allAverage')
  .get(fileController.read_file_in_directory_and_do_math);

//not in use
router.route('/specificOne').get(fileController.read_file_and_do_some_math);

// localhost:8080/files/monthData
//router.route('/monthData').get(fileController.read_month_data);

module.exports = router;
