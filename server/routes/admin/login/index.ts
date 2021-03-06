const { User } = require('../../../model/User/User')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { privateDecrypt } = require('crypto')

const { secret } = require('../../../config/key')
export = async (req, res) => {

  let user: {
    _id: string
    role: string
    name: string | number
    password: any
  }
  let token, userInfo: object

  //  使用私钥解密
  const publicKey = req.fields.val
  const dec_by_prv = privateDecrypt(globalThis.privateKey, Buffer.from(publicKey))
  const decryptedData = JSON.parse(dec_by_prv.toString('utf-8'))

  // const bytes = CryptoJS.AES.decrypt(req.fields.val, key);
  // const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  try {
    user = await User.findOne({ account: decryptedData.account });
  } catch (e) {
    return res.send({
      meta: { status: 400, message: '账号或密码错误！' }
    })
  }
  if (!user) {
    return res.send({
      meta: { status: 400, message: '账号或密码错误！' }
    })
  }
  //密码比对
  if (!await bcrypt.compare(decryptedData.password, user.password)) {
    return res.send({
      meta: { status: 400, message: '账号或密码错误！' }
    })
  }

  // 使用密钥对token加密生成 返回客户端
  const { _id, name } = user
  token = jwt.sign({ _id, name }, secret, { expiresIn: '7h' });
  userInfo = _.pick(user, ['role', 'account', 'name', 'status', 'joinTime']);
  res.send({ token, userInfo, meta: { status: 200, message: '登录成功' } })
}
