var test = require('../controller/mysql_testdb');
var md5 = require('md5');
var async = require('async');
var moment = require('moment');

exports.Plogin = function (req, res) {
    var user = req.body.username;
    var password = md5(req.body.password);
    test.index("select a.id,b.auths,b.name from heshe_admins as a left join heshe_admin_role as b on a.roleid=b.id where a.user='" + user + "' and a.password='" + password + "'", function (list) {
        if (list.length != 0) {
            req.session.user = user;
            req.session.rolename = list[0].name;
            req.session.auths = list[0].auths;
            res.cookie('token', 888888, {maxAge: 60 * 1000 * 60 * 24 * 7});
            res.clearCookie('login_error');
            test.index("UPDATE `heshe_admins` SET lastlogintime='" + moment().format('X') + "',lastloginip='" + req.socket.remoteAddress.replace("::ffff:", "") + "' WHERE `id` = " + list[0].id);
            res.redirect('/home');
        } else {
            if (req.cookies.login_error) {
                res.cookie('login_error', parseInt(req.cookies.login_error) + 1, {maxAge: 60 * 1000 * 60 * 24 * 7});
            } else {
                res.cookie('login_error', 1, {maxAge: 60 * 1000 * 60 * 24 * 7});
            }
            res.redirect('/login');
        }
    });
};

exports.Glogin = function (req, res) {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render('login');
    }
};

exports.index = function (req, res) {
    res.redirect('/login');
};

exports.logout = function (req, res) {
    res.clearCookie('token');
    req.session.destroy();
    res.redirect('/login');
};

exports.home = function (req, res) {
    async.series({
        one: function (done) {
            test.index("select max(w_id) as total from workers", function (list) {
                done(null, list);
            });
        },
        two: function (done) {
            test.index("select max(s_id) as total from students", function (list) {
                done(null, list);
            });
        },
        three: function (done) {
            test.index("select max(c_id) as total from classes", function (list) {
                done(null, list);
            });
        },
        four: function (done) {
            test.index("SELECT * FROM (notice AS a INNER JOIN heshe_admin_role AS b ON a.`n_author`=b.`id`) order by a.n_id DESC LIMIT 1", function (list) {
                done(null, list);
            });
        },
    }, function (error, result) {
        console.log(result.one,result.two,result.three)
        res.render('home', {
            workers_num: result.one[0].total,
            students_num: result.two[0].total,
            classes_num: result.three[0].total,
            first_notice: result.four[0]
        });
    })
};