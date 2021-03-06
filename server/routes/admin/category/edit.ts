const { Category, validateCategory } = require('../../../model/Category/Category')
const { User } = require('../../../model/User/User')
export = async (req, res) => {
  const { _id, foodTypeName } = req.fields
  try {
    validateCategory(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  let user = await User.findOne({ name: req.fields.whoAdd })
  req.fields.whoAdd = user._id
  console.log(req.fields)

  const cate = await Category.findOne({ foodTypeName: foodTypeName })
  if (cate) return res.send({ message: '此分类已存在' })

  const category = await Category.updateOne({ _id: _id }, { $set: req.fields })
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, category
  })
}
