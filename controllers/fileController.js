const fileModel = require('../models/fileModel');

const read_file_names = async (req, res) => {
    res.json(await fileModel.readFilesInDirectory());
};  

module.exports = {
  read_file_names,
};