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
// app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use('/api/users', require('./routes/users'));
app.use('/api/memo', require('./routes/memo'));

app.use('/uploads', express.static('uploads'));


if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));


    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});