const path = require('path');
const fs = require('fs');

let directoryPath = path.join('./', 'uploads');

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
        console.log('File exists');
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

const mapFilenamesToMonths = () => {
  return new Promise((resolve, reject) => {
    const filenameArray = [];

    const filesWithMonths = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };
    const months = [];
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        reject(err);
      }

      if (files.length < 1) {
        reject('No files!');
        //reject(filesWithMonths);
      }

      files.forEach(function (filename) {
        const dateString = filename.slice(0, 8);
        console.log('Date: ', dateString);
        const year = Number(dateString.slice(0, 4));
        console.log('Year: ', year);
        const date = Number(dateString.slice(6, 8));
        console.log('Date: ', date);
        const month = Number(dateString.slice(4, 6));
        console.log('Month: ', month);

        const hours = Number(filename.slice(9, 11));
        console.log('hours: ', hours);
        const minutes = Number(filename.slice(11, 13));
        console.log('minutes: ', minutes);
        const seconds = Number(filename.slice(13, 15));
        console.log('seconds: ', seconds);

        // YYYY-MM-DD hh:mm:ss
        const dateObject = new Date(
          year +
            '-' +
            month +
            '-' +
            date +
            ' ' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds
        );

        // use below to get local date and time format
        //console.log("Locale string", dateObject.toLocaleString('fi'));

        filenameArray.push(filename);
        if (!months.includes(month)) {
          months.push(month);
        }
        console.log('Month array: ', months);
        months.sort(function (a, b) {
          return a - b;
        });

        console.log('Month array after sort: ', months);

        months.forEach((month2) => {
          if (month == month2) {
            filesWithMonths[month].push(filename);
          }
        });
        console.log('Files with months: ', filesWithMonths);
      });
      resolve(filesWithMonths);
    });
  });
};

// counts average of all files
const readFilesInDirectoryAndDoMath = async () => {
  return new Promise((resolve, reject) => {
    //passsing directoryPath and callback function
    var sum = 0.0;
    fs.readdir(directoryPath, async function (err, files) {
      //handling error
      if (err) {
        reject(err);
      }

      if (files.length < 1) {
        reject('No files!');
      }

      var averageCounter = new Promise((resolve, reject) => {
        files.forEach(async (filename) => {
          oneAverage = await readFileAndDoSomeMath(filename);
          sum += oneAverage;
          var internalAverage = sum / files.length;
          console.log(
            'KESKIARVOTTELUA FOREACH: ',
            internalAverage,
            files.length,
            files.indexOf(filename)
          );
          if (files.indexOf(filename) === files.length - 1) resolve(sum);
        });
      });

      averageCounter.then((sum) => {
        console.log('All done!');

        var average = sum / files.length;

        resolve(average);
      });
    });
  });
};

//counts average of a file
const readFileAndDoSomeMath = (filename) => {
  return new Promise((resolve, reject) => {
    // check if file exists
    fs.access(directoryPath + '/' + filename, (err) => {
      if (err) {
        console.log("File doesn't exist");
        reject("File doesn't exist");
      } else {
        // read file
        fs.readFile(directoryPath + '/' + filename, 'utf8', (err, data) => {
          // remove extra ":" from Movesense json
          data = data.replace('data:', 'data');

          if (err) {
            console.error(err);
            return err;
          }
          // acceleration counter
          const schlumpf = JSON.parse(data);
          var sum = 0.0;
          schlumpf.data.forEach((floff) => {
            let x = floff.acc.ArrayAcc[0].x;
            let y = floff.acc.ArrayAcc[0].y;
            let z = floff.acc.ArrayAcc[0].z;
            let sqrtXZ = Math.sqrt(x * x + z * z);
            let accXYZ = Math.sqrt(y * y + sqrtXZ);
            sum += accXYZ;
          });
          let average = sum / schlumpf.data.length;

          resolve(average);
        });
      }
    });
  });
};

//TODO funktio joka laskee kuukauden keskiarvon (ja jos aikaa on niin kaikki kuukauden datan)
//TODO HUOM! X-CODESSA raja-arvot ja värit (punainen kun poikkeama suuri, ja vihreä kun poikeeama pieni)!!!

const calculateMonthData = async (month = 0) => {
  const filesWithMonthsMath = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  };

  // read all files from directory
  // month number is the key and key value is array of file names

  const monthsWithFiles = await mapFilenamesToMonths();

  console.log('#€%: ', typeof monthsWithFiles);
  // access specific month with
  // monthsWithFiles[n] where n is number of the month

  /*
  if (typeof monthsWithFiles == string) {
    return filesWithMonthsMath;
  }*/

  if (month == 0) {
    // loop trough all months and load corresponding files with readFile(filename) function
    console.log('Loop all files');
    for (const monthKey in monthsWithFiles) {
      const monthValue = monthsWithFiles[monthKey];
      //console.log('MonthKey: ' + monthKey + ' VALUE: ' + monthValue);
      var sum = 0.0;
      if (monthValue.length > 0) {
        for (let i = 0; i < monthValue.length; i++) {
          // load each file
          const fileData = await readFileAndDoSomeMath(monthValue[i]);

          sum += fileData;

          //filesWithMonthsMath[monthKey].push(fileData);

          //console.log('Month value: math: ', sum);

          // access filedata
        }
        filesWithMonthsMath[monthKey].push(sum / monthValue.length);
      } else {
        filesWithMonthsMath[monthKey].push(0.0);
      }
    }
  } else {
    // get only specific month data and loadfile with
    //console.log('Month : ' + month + ' -> ', monthsWithFiles[month]);
  }
  return filesWithMonthsMath;
};

const getMostRecentAverage = () => {
  return new Promise((resolve, reject) => {
    const filenameArray = [];

    const filesWithMonths = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };
    const months = [];
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        reject(err);
      }

      if (files.length < 1) {
        reject('No files!');
      }

      var now = new Date();
      var recent = null;
      var recentFilename = '';

      files.forEach(function (filename) {
        const dateString = filename.slice(0, 8);
        console.log('Date: ', dateString);
        const year = Number(dateString.slice(0, 4));
        console.log('Year: ', year);
        const date = Number(dateString.slice(6, 8));
        console.log('Date: ', date);
        const month = Number(dateString.slice(4, 6));
        console.log('Month: ', month);

        const hours = Number(filename.slice(9, 11));
        console.log('hours: ', hours);
        const minutes = Number(filename.slice(11, 13));
        console.log('minutes: ', minutes);
        const seconds = Number(filename.slice(13, 15));
        console.log('seconds: ', seconds);

        // YYYY-MM-DD hh:mm:ss
        const dateObject = new Date(
          year +
            '-' +
            month +
            '-' +
            date +
            ' ' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds
        );

        if (recent == null) {
          recent = dateObject;
          recentFilename = filename;
          //console.log('RECENT FILENAME 357: ', recentFilename);
        }

        if (recent <= dateObject) {
          recent = dateObject;
          recentFilename = filename;
          //console.log('RECENT FILENAME 362: ', recentFilename);
        }

        // use below to get local date and time format
        //console.log("Locale string", dateObject.toLocaleString('fi'));

        filenameArray.push(filename);
        if (!months.includes(month)) {
          months.push(month);
        }
        console.log('Month array: ', months);
        months.sort(function (a, b) {
          return a - b;
        });

        console.log('Month array after sort: ', months);

        months.forEach((month2) => {
          if (month == month2) {
            filesWithMonths[month].push(filename);
          }
        });
        console.log('Files with months: ', filesWithMonths);
      });
      console.log('RECENT FILENAME: ', recentFilename);
      if (!recentFilename == '') {
        resolve(readFileAndDoSomeMath(recentFilename));
      } else resolve(0);
    });
  });
};

/*
const readMonthData = async (month = 0) => {
  // read all files from directory
  // month number is the key and key value is array of file names
  const monthsWithFiles = await mapFilenamesToMonths();
  console.log('MonthData ', monthsWithFiles);

  // access specific month with
  // monthsWithFiles[n] where n is number of the month
  console.log('Prints April (Huhtikuu)', monthsWithFiles[4]);

  if (month == 0) {
    // loop trough all months and load corresponding files with readFile(filename) function
    console.log('Loop all files');
    for (const monthKey in monthsWithFiles) {
      const monthValue = monthsWithFiles[monthKey];
      console.log('MonthKey: ' + monthKey + ' VALUE: ' + monthValue);

      if (monthValue.length > 0) {
        for (let i = 0; i < monthValue.length; i++) {
          // load each file
          const fileData = await readFile(monthValue[i]);
          console.log('Month value: ', fileData);

          // access filedata
        }
      }
    }
  } else {
    // get only specific month data and loadfile with
    console.log('Month : ' + month + ' -> ', monthsWithFiles[month]);
  }
  return monthsWithFiles;
};
*/

module.exports = {
  mapFilenamesToMonths,
  //readMonthData,
  readFile,
  readFileAndDoSomeMath,
  readFilesInDirectoryAndDoMath,
  calculateMonthData,
  getMostRecentAverage,
};
