const path = require('path');
const fs = require('fs');

const read_file_names = async (req, res) => {
    //joining path of directory 
    const directoryPath = path.join("./", 'uploads');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
    });    
};  

module.exports = {
  read_file_names,
};