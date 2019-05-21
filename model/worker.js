var test = require('../controller/mysql_testdb');
var showPage = require('../controller/page');
var async = require('async');
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
            test.index("select * from workers order by w_id asc limit " + (parseInt(page) - 1) * pagesize + "," + pagesize, function (list) {
                done(null, list);
            });
        },
        two: function (done) {
            test.index("SELECT COUNT(*) AS total FROM workers", function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.render('worker', {
            workerlist: result.one,
            page: showPage.show(url, result.two[0].total, pagesize, page),
        });
    })
};

exports.add = function (req, res) {
    var name = req.body.name;
    var auths = req.body.auths;

    async.series({
        one: function (done) {
            test.index("INSERT INTO `heshe_stats`.`heshe_admin_role` (`name`, `auths`) VALUES ('" + name + "', '" + auths + "')", function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/worker');
    });
};

exports.edit = function (req, res) {
    var id = req.query.id; //获取当前页数，如果没有则为1

    async.series({
        one: function (done) {
            test.index("select * from workers where id = "+id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.render('worker_edit', {
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
            test.index("UPDATE `workers` SET `name` = '" + name + "',`auths` = '" + auths + "' WHERE `w_id` = " + id, function (list) {
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
            test.index("DELETE FROM `workers` WHERE `w_id` = " + id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/worker');
    });
};