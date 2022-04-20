'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const uploadRouter = require('./routes/uploadRouter');

app.use(express.static('public'));

app.use('/upload', uploadRouter);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
