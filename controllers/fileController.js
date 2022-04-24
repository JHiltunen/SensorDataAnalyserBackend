const fileModel = require('../models/fileModel');

const map_file_names_to_months = async (req, res) => {
  res.json(await fileModel.mapFilenamesToMonths());
};

const get_most_recent_average = async (req, res) => {
  res.json(await fileModel.getMostRecentAverage());
};

const read_file_in_directory_and_do_math = async (req, res) => {
  res.json(await fileModel.readFilesInDirectoryAndDoMath());
};

const read_month_data = async (req, res) => {
  res.json(await fileModel.readMonthData());
};

const calculate_month_data = async (req, res) => {
  res.json(await fileModel.calculateMonthData());
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
  map_file_names_to_months,
  read_month_data,
  read_file,
  read_file_and_do_some_math,
  read_file_in_directory_and_do_math,
  calculate_month_data,
  get_most_recent_average,
};
