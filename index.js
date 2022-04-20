'use strict';

const express = require('express');
const app = express();
const port = 3000;
const uploadRouter = require('./routes/uploadRouter');

app.use(express.static('public'));

app.use('/upload', uploadRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
