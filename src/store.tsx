import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers/rootReducers'
import createSagaMiddleware from 'redux-saga'
import loginSaga from './containers/login/loginSaga';
import { spawn } from '@redux-saga/core/effects';
import accountSaga from './containers/account/accountSaga';

// create saga createSagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//  mount it on the store 


const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
)

function* rootSagas() {
  yield spawn(loginSaga)
  yield spawn(accountSaga)
}
// run the saga 
sagaMiddleware.run(rootSagas)

export default store;