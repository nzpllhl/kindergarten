const express = require('express');
const router = express.Router();

const login = require('../model/login');
const user = require('../model/user');
const role = require('../model/role');
const worker = require('../model/worker');
const notice = require('../model/notice');
const classes = require('../model/classes');
const students = require('../model/students');

router.get('/',login.index)

// login
router.route('/login')
.get(login.Glogin)
.post(login.Plogin);
router.all('/logout',login.logout);
router.get('/home',login.home);


/* 用户管理 */
router.get('/user', user.index);
router.post('/addUser', user.add);
router.get('/editUser', user.edit);
router.post('/updateUser', user.update);
router.get('/delUser', user.delete);

/* 权限管理 */
router.get('/role', role.index);
router.post('/addRole', role.add);
router.get('/editRole', role.edit);
router.post('/updateRole', role.update);
router.get('/delRole', role.delete);

// 公告管理
router.get('/notice',notice.index);
router.get('/addnotice',notice.addform);
router.post('/addnotice',notice.add);
router.get('/delNotice',notice.delete);

//职工管理
router.get('/worker',worker.index);

//班级管理
router.get('/classes',classes.index);

//学生管理
router.get('/students',students.index);

//照片墙
router.get('/photowall', function(req,res){
    res.render('photowall');
});









module.exports = router;