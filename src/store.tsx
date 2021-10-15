
import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers/rootReducers'
import createSagaMiddleware from 'redux-saga'
import loginSaga from './containers/login/loginSaga';

// create saga createSagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//  mount it on the store 


const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
)

// run the saga 
sagaMiddleware.run(loginSaga)

export default store;