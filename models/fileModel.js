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

//TODO funktio joka lukee sen tiedoston, jonka nimi tulee funktioon parametrina
const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(directoryPath + '/' + filename, 'utf8', (err, data) => {
      // remove extra ":" from Movesense json
      data = data.replace('data:', 'data');

      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(JSON.parse(data));
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
