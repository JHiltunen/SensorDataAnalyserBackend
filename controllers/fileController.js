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
            fs.readFile(directoryPath + '/' + filename, 'utf8' , (err, data) => {
                // remove extra ":" from Movesense json 
                data = data.replace("data:", "data");
                
                if (err) {
                  console.error(err);
                  return
                }
                console.log("DATAAAAAAAAA: ", data);
                var obj2 = JSON.parse(data);
                console.log("jkslh", obj2.data.pop());
            });
        });
    });    
};  

module.exports = {
  read_file_names,
};