const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connect = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/users', require('./routes/users'));
app.use('/api/memo', require('./routes/memo'));



const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});