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
        const dateString = filename.slice(0, 8);
        console.log("Date: ", dateString);
        const year = Number(dateString.slice(0, 4));
        console.log("Year: ", year);
        const date = Number(dateString.slice(4, 6));
        console.log("Date: ", date);
        const month = Number(dateString.slice(6, 8));
        console.log("Month: ", month);

        const hours = Number(filename.slice(9, 11));
        console.log("hours: ", hours);
        const minutes = Number(filename.slice(11, 13));
        console.log("minutes: ", minutes);
        const seconds = Number(filename.slice(13, 15));
        console.log("seconds: ", seconds);

        // YYYY-MM-DD hh:mm:ss
        const dateObject = new Date(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
        
        // use below to get local date and time format
        //console.log("Locale string", dateObject.toLocaleString('fi'));
        
        filenameArray.push(filename);
      });
      resolve(filenameArray);
    });
  });
};

function convertFromStringToDate(responseDate) {
  let dateComponents = responseDate.split('T');
  let datePieces = dateComponents[0].split("-");
  let timePieces = dateComponents[1].split(":");
  return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
                       timePieces[0], timePieces[1], timePieces[2]))
}

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
