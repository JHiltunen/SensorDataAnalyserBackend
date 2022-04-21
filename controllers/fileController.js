const fileModel = require('../models/fileModel');

const read_file_names = async (req, res) => {
    res.json(await fileModel.readFilesInDirectory());
};  

const read_month_data = async (req, res) => {
    res.json(await fileModel.readMonthData());
};

const read_file = async (req, res) => {
  res.json(await fileModel.readFile("20220411T112412Z_174430000206_acc_stream.json"))
};

module.exports = {
  read_file_names,
  read_month_data,
  read_file,
};