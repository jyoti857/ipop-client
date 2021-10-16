import { takeLatest, put, call} from 'redux-saga/effects';
import { customFetch, uri } from '../../utils/fetchUrl';
import { setTokenAction } from './actions';
import { LOGIN_SAGA_DISPATCH } from './constants';


type ResponseData = {data: {access_token: string; user: {userRole: any}}}
function* loginApi({email, password}: any){
  // username is mandatory and should be same as email, that is how it is designed in the backend 
  const body = JSON.stringify({email, password, username: email});
  console.log("hello saga ----> ", body)
  const options = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': "application/json",
    }
  }
  const response: ResponseData = yield call(customFetch, uri+'/auth/login', options);
  console.log(response, "from saga")
  console.log("hello saga ----> ")
  const {data: {access_token, user: {userRole}}} = response;
  console.log(access_token, userRole)
  yield put(setTokenAction(access_token, userRole))
}

export default function* loginSaga(){
  yield takeLatest(LOGIN_SAGA_DISPATCH, loginApi);
}