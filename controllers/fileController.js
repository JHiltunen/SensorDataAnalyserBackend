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

        files.forEach(function (filename) {
            // Do whatever you want to do with the file
            //var rawFile = fs.readFileSync(directoryPath + '/' + filename);
            //console.log("DAS", rawFile);
            //const twoDimArr= rawFile.map(obj => Object.values(obj));
            //console.log("JIJDJ:: ", twoDimArr['']);
            //console.log(`File: ${rawFile.data[0].acc.ArrayAcc[0].x}`);
            fs.readFile(directoryPath + '/' + filename, 'utf8' , (err, data) => {
                if (err) {
                  console.error(err);
                  return
                }
                console.log(data);
            });
            //console.log(filename); 
        });
    });    
};  

module.exports = {
  read_file_names,
};