import {all, fork} from 'redux-saga/effects'
import * as demoSaga from './demoSaga'
import * as roleSaga from './roleSaga'
import * as userSaga from './userSaga'

export function* rootSaga () {
  yield all([
    ...Object.values(demoSaga),
    ...Object.values(roleSaga),
    ...Object.values(userSaga)
  ].map(fork))
}