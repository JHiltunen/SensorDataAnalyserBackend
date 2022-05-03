# SensorDataAnalyserBackend

Backend for SensorDataAnalyser. Allows user to send Movesense sensor acceleration JSON data to server.

## FrontEnd
- SensorDataAnalyser-frontend can be found from [here](https://github.com/JHiltunen/SensorDataAnalyser)

## Environments
- SensorDataAnalyserBackend is running on [Azure](https://sensordataanalyserbackend.azurewebsites.net/)

## Usage
These endpoints allows you to interact with the backend.
## GET
`/files/` returns all files grouped by month in JSON.

`/files/monthDataMath` returns average of each month if there is data.

`/files/recent` returns average of the latest JSON.

`/files/allAverage` returns average of all JSON files

## POST
`/upload/` Uploads new file(s) to server disk.

**Parameters**
**multipart/form-data**
| Name          | Required      | Type  | Additional info       |
| ------------- |:-------------:| -----:| ---------------------:|
| files         | true          |file   | one or multiple files |

---
## Requirements

For development, you will only need Node.js and Node.js package manager, installed in your environement.

### Node
- #### Node installation on Windows
  Install [node.js](https://nodejs.org/en/) to get the package manager **npm**

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.14.0

    $ npm --version
    8.3.1

---

## Install

    $ git clone https://github.com/JHiltunen/SensorDataAnalyserBackend
    $ cd SensorDataAnalyserBackend
    $ npm install

## Running the project

    $ node index.js
