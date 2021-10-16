import { combineReducers } from 'redux'
import { AccountReducers } from '../containers/account/reducers';
import { loginReducers } from '../containers/login/reducers';

export interface ReducersType {
  authReducers?: any,
  accountReducers?: any,
}
const rootReducers = combineReducers<ReducersType>({
  authReducers: loginReducers,
  accountReducers: AccountReducers,
})

export default rootReducers;