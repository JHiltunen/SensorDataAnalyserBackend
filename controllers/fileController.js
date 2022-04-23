const fileModel = require('../models/fileModel');

const read_file_names = async (req, res) => {
  res.json(await fileModel.readFilesInDirectory());
};

const read_month_data = async (req, res) => {
  res.json(await fileModel.readMonthData());
};

const read_file = async (req, res, next) => {
  try {
    // res.json(await fileModel.readFile("HHUJSFK"));
    res.json(
      await fileModel.readFile('20220411T112412Z_174430000206_acc_stream.json')
    );
  } catch (error) {
    next(error);
  }
};

const read_file_and_do_some_math = async (req, res, next) => {
  try {
    // res.json(await fileModel.readFile("HHUJSFK"));
    res.json(
      await fileModel.readFileAndDoSomeMath(
        '20220411T112412Z_174430000206_acc_stream.json'
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read_file_names,
  read_month_data,
  read_file,
  read_file_and_do_some_math,
};
