var test = require('../controller/mysql_testdb');
var showPage = require('../controller/page');
var async = require('async');
var moment = require('moment');
var pagesize = 20;

exports.index = function (req, res) {
    var page = req.query.page ? req.query.page : 1; //获取当前页数，如果没有则为1
    var url = req.originalUrl; //获取当前url，并把url中page参数过滤掉
    url = url.replace(/([?&]*)page=([0-9]+)/g, '');
    if (/[?]+/.test(url)) {
        url += '&';
    } else {
        url += '?';
    }

    async.series({
        one: function (done) {
            test.index("SELECT * FROM (notice AS a INNER JOIN heshe_admin_role AS b ON a.`n_author`=b.`id`) order by a.n_id DESC LIMIT " + (parseInt(page) - 1) * pagesize + "," + pagesize, function (list) {
                done(null, list);
            });
        },
        two: function (done) {
            test.index("SELECT COUNT(*) AS total FROM notice", function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.render('notice', {
            noticelist: result.one,
            page: showPage.show(url, result.two[0].total, pagesize, page)
        });
    })
};

exports.addform = function (req, res) {
        res.render('addnotice');
};

exports.add = function (req, res) {
    var nTitle = req.body.nTitle;
    var nContent = req.body.nContent;
    var nAuthor = 2;
    var nTime = moment().format('X');

    async.series({
        one: function (done) {
            test.index("insert into notice values(null,'" +nTitle +"','" +nAuthor +"','" +nTime +"','" +nContent +"')", function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/notice');
    });
};

exports.edit = function (req, res) {
    var id = req.query.id; 

    async.series({
        one: function (done) {
            test.index("select * from heshe_admin_role where id = "+id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.render('role_edit', {
            role: result.one[0]
        });
    })
};

exports.update = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var auths = req.body.auths;

    async.series({
        one: function (done) {
            test.index("UPDATE `heshe_admin_role` SET `name` = '" + name + "',`auths` = '" + auths + "' WHERE `id` = " + id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/role');
    });
};

exports.delete = function (req, res) {
    var id = req.query.id;

    async.series({
        one: function (done) {
            test.index("DELETE FROM `notice` WHERE `n_id` = " + id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/notice');
    });
};