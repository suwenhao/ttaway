import { takeLatest, put} from 'redux-saga/effects'
import { GET_USER_LIST, GET_USER_LIST_SET } from '../constants/userType'
import { reqUserList } from '../../api'
// import { ErrorPrint } from '../../model/Print'

// 获取管理员列表
const getUserLit = function* (action: any) {
  try {
    let { data } = yield reqUserList({})
    yield put({
      type: GET_USER_LIST_SET,
      polyload: data.data
    })
  } catch (error) {}
}

export function* watchAddSync () {
  yield takeLatest(GET_USER_LIST, getUserLit)
}