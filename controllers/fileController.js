const fileModel = require('../models/fileModel');

const read_file_names = async (req, res) => {
    res.json(await fileModel.readFilesInDirectory());
};  

const read_month_data = async (req, res) => {
    res.json(await fileModel.readMonthData());
};

module.exports = {
  read_file_names,
  read_month_data,
};