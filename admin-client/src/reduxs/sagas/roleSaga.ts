import { takeLatest, put} from 'redux-saga/effects'
import { GET_ROLE_LIST, GET_ROLE_LIST_SET } from '../constants/roleType'
import { reqRole } from '../../api'
// import { ErrorPrint } from '../../model/Print'

// 获取角色列表
const getRoleList = function* (action: any) {
  try {
    let { data } = yield reqRole({})
    yield put({
      type: GET_ROLE_LIST_SET,
      polyload: data.data
    })
  } catch (error) {}
}

export function* watchAddSync () {
  yield takeLatest(GET_ROLE_LIST, getRoleList)
}