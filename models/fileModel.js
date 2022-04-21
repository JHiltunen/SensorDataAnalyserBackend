const path = require('path');
const fs = require('fs');

let directoryPath = path.join('./', 'uploads')

const readFilesInDirectory = (file) => {
  return new Promise((resolve, reject) => {
    const filenameArray = [];
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        reject(err);
      }

      files.forEach(function (filename) {
        filenameArray.push(filename);
      });
      resolve(filenameArray);
    });
  });
};

//TODO Ei nyt mulla katos se ajatus päästä!!! --> Vittu voi voi!!!

//TODO funktio joka käy läpi kaikki tiedostot uploads-kansiosta ja palauttaa tiedoston nimet

// function that reads file that's name is given in parameter
// file has to be in /uploads folder
const readFile = (filename) => {
  return new Promise((resolve, reject) => {
      // check if file exists
      fs.access(directoryPath + '/' + filename, (err) => {
        if (err) {
          console.log("File doesn't exist");
          reject("File doesn't exist");
        } else {
          console.log("File exists")
          // read file
          fs.readFile(directoryPath + '/' + filename, 'utf8', (err, data) => {
            // remove extra ":" from Movesense json
            data = data.replace('data:', 'data');
      
            if (err) {
              console.error(err);
              return err;
            }
            resolve(JSON.parse(data));
          });
        } 
      });
  });
};

//TODO funktio joka laskee kuukauden keskiarvon (ja jos aikaa on niin kaikki kuukauden datan)

//TODO HUOM! X-CODESSA raja-arvot ja värit (punainen kun poikkeama suuri, ja vihreä kun poikeeama pieni)!!!

const readMonthData = () => {
  return new Promise((resolve, reject) => {});
};

module.exports = {
  readFilesInDirectory,
  readMonthData,
  readFile,
};
