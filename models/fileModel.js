const path = require('path');
const fs = require('fs');

const readFilesInDirectory = (file) => {
    return new Promise((resolve, reject)=>{
        const filenameArray = [];
        //joining path of directory 
        const directoryPath = path.join("./", 'uploads');
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                reject(err);
            }
    
            files.forEach(function (filename) {
                filenameArray.push(filename);
    
                fs.readFile(directoryPath + '/' + filename, 'utf8', (err, data) => {
                    // remove extra ":" from Movesense json 
                    data = data.replace("data:", "data");
    
                    if (err) {
                        console.error(err);
                        return err;
                    }

                    var obj = JSON.parse(data);
                });
            });
            resolve(filenameArray);
        });    
    });
};

module.exports = {
    readFilesInDirectory,
};