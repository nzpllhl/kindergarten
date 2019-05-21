const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

var app = express();

//日志记录方式
app.use (logger('dev'));
//模板
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//数据解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//cookie
app.use(cookieParser());
app.use(session({
    secret: "secret",
    name: 'cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10 * 60 * 60 * 1000}
}));

//静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    if(req.url != '/login' && req.session.user === undefined){
        res.redirect('/login');
        return;
    }
    res.locals.user = req.session.user;
    res.locals.auths = req.session.auths;
    res.locals.rolename = req.session.rolename;
    next();
});
//路由
app.use('/', routes);

//404
app.use((req,res,next)=>{
    var err = new Error('not found');
    err.status = 404;
    res.render('404');
    return;
    next(err);
})
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        
    });
}
500
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
})
module.exports = app;
