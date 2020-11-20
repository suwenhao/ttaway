import { Store, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import reducers from './reduxs/reducers'
import { rootSaga } from './reduxs/sagas'

let sagaMiddleware = createSagaMiddleware();
var store: Store;
if (process.env.NODE_ENV === "production") {
  store = createStore(reducers, {}, applyMiddleware(sagaMiddleware))
} else {
  store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)))
}
sagaMiddleware.run(rootSaga);

export default store