import { combineReducers } from 'redux'
import { loginReducers } from '../containers/login/reducers';

export interface ReducersType {
  authReducers?: any
}
const rootReducers = combineReducers<ReducersType>({
  authReducers: loginReducers
})

export default rootReducers;