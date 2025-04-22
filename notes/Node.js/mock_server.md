## Mock server

 ```Javascript
var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var fs              = require("fs");
var cors            = require('cors')
var glob            = require("glob");
const chalk         = require("chalk");
var applicationRoot = __dirname.replace(/\\/g, "/");
var mockRoot        = applicationRoot + '/mocks/api';
var mockFilePattern = '.json';
var mockRootPattern = mockRoot + '/**/*' + mockFilePattern;
var apiRoot         = '/api';

/*
    The mock server maps the url to a folder in the roote folder according to:
    ->  /mocks/api/getTest.json is mapped to -> http://localhost:3000/api/getTest
    ->  /mocks/api/sub/getTest.json is mapped to -> http://localhost:3000/api/sub/getTest

    It accepts .get .post . put. patch .delete requests
*/

var app = express();
app.set('port', process.env.PORT || 3000);

console.log(chalk.green.bold('==================================================================='));

// MIDDLEWARES
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors()) /* CORS-enabled for all origins! */

/* Read the directory tree according to the pattern specified above. */
var files = glob.sync(mockRootPattern);

/* Register mappings for each file found in the directory tree. */
if (files && files.length > 0) {
  files.forEach(function (fileName) {

    var mapping = apiRoot + fileName.replace(mockRoot, '').replace(mockFilePattern, '');
    console.log(chalk.cyan.bold('Registered mapping: ' + mapping +' -> '+ fileName));

    app.get(mapping, function (req, res) {
      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(data);
      res.end();
    });

    app.post(mapping, function (req, res) {
      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(data);
      res.end();
    });

    app.put(mapping, function (req, res) {
      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(data);
      res.end();
    });

    app.patch(mapping, function (req, res) {
      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(data);
      res.end();
    });

    app.delete(mapping, function (req, res) {
      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(data);
      res.end();
    });

  })
} else {
  console.log(chalk.red.bold('No mappings found! Please check the configuration.'));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("first");
  /* var err = new Error('api path Not Found'); */
  res.status(404).json({"message":"Sorry can't find that!"});
});

// error handlers

// development error handler
// will print stacktrace
/* if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log("second");
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  console.log("tre");
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}); */


app.listen(app.get('port'), function () {
  console.log(chalk.green.bold('==================================================================='));
  console.log(chalk.green.bold('Mock Server is listening on port: ' + app.get('port')));
});

module.exports = app;
```