const { Orders } = require('../../../model/Order/Orders')

export = async (ws, req) => {
  ws.on("message", function (msg) {
    ws.send('websocket connected')
    //定时器轮询数据库数据
    globalThis.orders = ''

    // setInterval(async (_this, ws) => {
    //   const orders = await Orders.find({})
    //   //订单变动检查
    //   console.log(_this.orders === JSON.stringify(orders))
    //   if (_this.orders !== JSON.stringify(orders)) {
    //     _this.orders = JSON.stringify(orders)
    //     let order = await Orders.find({}).populate('tableid')
    //     //找到未完成订单
    //     order = order.filter(val => val.status !== 1)
    //     order = order.map(val => {
    //       return {
    //         order: val.orderdetail,
    //         orderid: val._id,
    //         tableID: val.tableid.tableID,
    //         fromNow: val.begintime
    //       }
    //     })
    //     order = order.filter(val => val.order.length !== 0)
    //     //每个菜品详情中加入tableID\orderid 便于厨师端table显示
    //     order.forEach(val => val.order.forEach(value => {
    //       value.tableID = val.tableID
    //       value.orderid = val.orderid
    //     }))
    //
    //     ws.send(JSON.stringify(order))
    //   }
    // }, 1000, globalThis, ws)

    //用于更新订单
    setInterval(async (_this, ws) => {
      await Orders.find({}).populate('tableid').then(val => {
        let order = val
        //找到未完成订单
        order = order.filter(val => val.status !== 1)
        order = order.map(val => {
          return {
            order: val.orderdetail,
            orderid: val._id,
            tableID: val.tableid.tableID,
            fromNow: val.begintime,
            remarks: val.remarks
          }
        })
        order = order.filter(val => val.order.length !== 0)
        //每个菜品详情中加入tableID\orderid 便于厨师端table显示
        order.forEach(val => val.order.forEach(value => {
          value.tableID = val.tableID
          value.orderid = val.orderid
        }))
        ws.send(JSON.stringify(order))
      })
    }, 2000, globalThis, ws)
    console.log('websocket connected')
  })
}
