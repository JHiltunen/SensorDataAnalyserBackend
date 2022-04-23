const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
// localhost:8080/files
router.route('/').get(fileController.map_file_names_to_months);

// localhost:8080/files/monthData
router.route('/monthData').get(fileController.read_month_data);

router.route('/read').get(fileController.read_file);

router.route('/schlumpf').get(fileController.read_file_and_do_some_math);

router
  .route('/allAverage')
  .get(fileController.read_file_in_directory_and_do_math);

//router.route('/spock').get(fileController.calculates_average_of_all);

module.exports = router;
