import { combineReducers } from 'redux'
import demo from './demoReducer'
import cookie from './cookieReducer'
import global from './globalReducer'
import role from './roleReducer'
import user from './userReducer'

export default combineReducers({
  demo,
  cookie,
  global,
  role,
  user
})