import { takeLatest, put, call} from 'redux-saga/effects'
import { GETLIST, GETLIST_SET } from '../constants/demoType'
import axios from 'axios'

const getList_set = function* (action: any) {
  console.log(action)
  try {
    let { data } = yield call(axios.get, 'http://localhost:3005/list?_page=1&_limit=' + action.polyload.count)
    yield put({
      type: GETLIST_SET,
      polyload: {
        data
      }
    })
  } catch (error) {
    console.error('请求出错，服务器是否开启了？')
    console.error(error)
  }
}

export function* watchAddSync () {
  yield takeLatest(GETLIST, getList_set)
}