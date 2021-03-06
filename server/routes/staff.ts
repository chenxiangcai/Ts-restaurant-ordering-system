/*
* @name: 用户二级路由
* @description:
* @author: 陈相材
* @time: 2020-12-20 14:41:00
*/

const staff = require('express').Router();

//用户列表
staff.get('/', require('./admin/staffs/list'))
staff.post('/add', require('./admin/staffs/add'))
staff.delete('/:id', require('./admin/staffs/del'))
staff.put('/edit', require('./admin/staffs/edit'))
staff.post('/pwd', require('./admin/staffs/pwd'))

export = staff
