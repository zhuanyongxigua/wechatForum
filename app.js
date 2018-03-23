import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import bytes from 'bytes';
import connectBusboy from 'connect-busboy';
import session from 'express-session';
import passport from 'passport';
import passportGithub from 'passport-github';
const GitHubStrategy = passportGithub.Strategy;
import config from './config';

require('./models/init');

import RouteApi from './routes/router.api.js';
import UserModel from './models/user';

const app = express();
app.set('view engine', 'jade');

app.all("*", (req, res, next) => {      //支持跨域调试
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({secret: '12345-67890-09876-54321'}));
app.use(cookieParser('12345-67890-09876-54321'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GitHubStrategy({
    signinValid: true,
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
      UserModel.findOne({ githubId: profile.id }, function(err, user) {
        if(err) {
          console.log(err); // handle errors!
        }
        if (!err && user !== null) {
          cb(null, user);
        } else {
          user = new UserModel({
            githubId: profile.id,
            avatar: profile._json.avatar_url,
            username: profile.username
          });
          user.OauthId = profile.id;
          user.OauthToken = accessToken;
          user.save(function(err) {
            if(err) {
              console.log(err); // handle errors!
            } else {
              console.log("saving user ...");
              cb(null, user);
            }
          });
        }
      });
  }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(express.static(path.join(__dirname, 'public')));

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

export default app;
