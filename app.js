var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var browserSync = require("browser-sync").create();
var bytes = require('bytes');
var connectBusboy = require('connect-busboy');
require('./models/init');

var RouteApi = require('./routes/router.api.js');

browserSync.init({
    files: ["static/js/lib/*.js", "views/*.html", "static/css/style.css"],
    server: true,
    startPath: "views/001-home.html",
    localOnly: true,
    port: 8081,
    notify: false,
    reloadOnRestart: false,
    open: false
});

var app = express();
app.set('view engine', 'jade');

app.all("*", (req, res, next) => {      //支持跨域调试
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// console.log(multer);
// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res, next) => {
//     var option = {
//         root: __dirname + '/views/',
//     }
//     res.sendFile('001-home.html', option, (err) => {
//         if (err) {
//             next(err);
//         } else {
//             console.log('sent:');
//         }
//     });
// });
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/views', express.static(path.join(__dirname, 'views')));

app.use(
  connectBusboy({
    limits: {
      fileSize: 10 * 1024 * 1024
    }
  })
);

app.use('/api', RouteApi);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
