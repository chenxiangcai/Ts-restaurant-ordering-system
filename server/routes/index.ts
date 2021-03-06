/*
* @name: 路由集合
* @description: 一级路由集合
* @author: 陈相材
* @time: 2020-12-14 19:49:21
*/
export = app => {
  /*后台路由*/
  app.use('/admin/*', require('./guard')) //权限拦截

  app.use('/admin/staff', require('./staff')) //用户二级路由
  app.use('/admin/dish', require('./dish')) //菜品
  app.use('/admin/category', require('./category')) //菜品分类
  app.use('/category', require('./category')) //菜品分类关联菜品

  app.use('/admin/customer', require('./customer')) //会员
  app.use('/waiter/customer', require('./customer'))
  app.post('/getVerificationCode',require('./verCode')) //验证码生成
  app.post('/isvercode',require('./verCode')) //验证码验证

  app.use('/admin/order', require('./adminOrder')) //管理员订单
  app.use('/chef/order', require('./chefOrder'))  //厨师订单
  app.use('/cus/order', require('./cusOrder'))  //顾客订单
  app.use('/waiter/order', require('./waiterOrder')) //服务员订单
  app.get('/waiter/dish', require('./waiter/dish/list')) //服务员菜品列表
  app.use('/admin/dashboard', require('./admin/dashboard/detail')) //看板
  app.use('/admin/table', require('./table')) //餐桌

  app.get('/admin/qrcode/:id', require('./qrcode'))// 网站二维码
  app.get('/waiter/qrcode/:id', require('./qrcode'))

  app.post('/login', require('./admin/login')) //用户登录

  app.post('/upload', require('./admin/upload')) //图片上传
  app.post('/staff/pwd', require('./admin/staffs/pwd')) //密码路由

  app.get('/waiter/table', require('./admin/table/list'))
  app.get('/waiter/staff', require('./admin/staffs/list'))

  /*前台路由*/
  app.use('/home', require('./front'))

}
