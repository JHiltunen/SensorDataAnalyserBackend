'use strict';
const uploadModel = require('../models/uploadModel');

const upload_json_file = async (req, res) => {
    res.json("UPLOADDDDDDDDDDDD");
    /*const user = req.body;
    const userid = await uploadModel.upload(user);
    user.id = userid;
    res.redirect('/');*/
};  

module.exports = {
  upload_json_file,
};