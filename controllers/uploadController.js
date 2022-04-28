'use strict';
const uploadModel = require('../models/uploadModel');

const upload_json_file = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a json file');
    error.httpStatusCode = 415;
    const err = res.json({
      success: false,
      fileMissing: true
    })
    return next(err);
    //return next({"erorr": error});
  }
  res.json({
    success: true,
  });
};  

module.exports = {
  upload_json_file,
};