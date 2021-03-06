import { put } from 'redux-saga/effects'
import * as types from './actions'
import { post, puts } from "../../../utils/http";
import { setStore } from "../../../utils/storage";

function* addOrder(action: any) {
  try {
    console.log('新增saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    if (result.status === 200) {
      yield put({ type: types.SORDERADDSUC, data: result })
      setStore('orderid', result.order._id)
      console.log('添加成功')
    } else {
      console.log('发送了添加错误的action')
      yield put({ type: types.SORDERADDERR, data: result })
    }
  } catch (e) {
    // todo 网络错误提示
    // yield put({type: types.NETERROR})
  }
}

function* updateOrder(action: any) {
  console.log(999999)
  try {
    console.log('修改saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result?.meta?.status === 200) {
      console.log('修改成功')
      yield put({ type: types.SORDEREDITSUC, data: result })
    } else {
      yield put({ type: types.SORDEREDITERR, data: result })
    }
  } catch (e) {

  }
}


function* retSetShopCarState(action: any) {
  yield put({ type: types.RESET, })
}

export { types, addOrder, updateOrder, retSetShopCarState };
