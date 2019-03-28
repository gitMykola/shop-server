const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const morgan = require('morgan');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');

//set global AppDirectory
global.appRoot = path.resolve(__dirname);
//set mongoose Promise
mongoose.Promise = global.Promise;
//database connection
mongoose.connect('mongodb://127.0.0.1:27017/shop',
    {
        useNewUrlParser: true
    });
//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', err => {
    console.log('Database connection error: ' + err, 0);
});
//set logger
app.use(morgan('dev'));
//set body parser
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));
//set CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, ");
    next();
});
//static file
app.use(express.static(appRoot + 'public/uploads'));
//set global API URL
global.apiUrl = 'http://localhost/';
//set image uploaded dir. Localhost win10x64 gag.
global.imagePath = 'C:\\Projects\\ShopServer\\public\\uploads\\';
// add routes
const routes = require(appRoot + '/routes/routes');
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    //render the error page
    res.status(err.status || 500);
    res.json(err.message);
});
//start server
server.listen(process.env.PORT || 2345, function () {
    console.log('Server start on port: ' + server.address().port);
});