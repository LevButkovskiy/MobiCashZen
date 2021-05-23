var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const appUtil = require('./appUtil');

const authAPIURL = '/api/v1/auth';
const articlesAPIURL = '/api/v1/articles';
const uploadsAPIURL = '/api/v1/uploads';
const userAPIURL = '/api/v1/user';
const publicAPIURL = '/api/v1/public';

var authActions = require('./routes/auth-actions');
var articlesActions = require('./routes/articles-actions');
var uploadsActions = require('./routes/uploads-actions');
var userActions = require('./routes/user-actions');
var publicActions = require('./routes/public-actions');

require('./dbMongo');

var app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'api-token']);
    next();
});

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/admin', require('./controllers/admin'))

app.use(authAPIURL, authActions);
app.use(uploadsAPIURL, uploadsActions);

app.use(articlesAPIURL, articlesActions);
app.use(userAPIURL, userActions);
app.use(publicAPIURL, publicActions);


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
  
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('/article', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('/article/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('/static/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/' + req.path));
});

app.get('/images/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/' + req.path));
});

app.get('/locales/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../client/build/' + req.path));
});

app.use('/api/v1/*', function(req, res, next){
    let token = req.header('api-token');
  
    appUtil.checkToken(token, function (success, err) {
        if (err) {
          res.status(401);
          return res.json({ error: err });
        }
        next()
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  
    console.log('>' + (err.status || 500), err.message)
  
    res.end();
});

module.exports = app;
