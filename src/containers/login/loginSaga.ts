import { takeLatest, put, call} from 'redux-saga/effects';
import { customFetch, uri } from '../../utils/fetchUrl';
import { setLoadingAction, setTokenAction } from './actions';
import { LOGIN_SAGA_DISPATCH } from './constants';


type ResponseData = {data: {access_token: string; user: {userRole: any, username: string}}}
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
  const {data: {access_token, user: {userRole, username}}} = response;
  console.log("sdkad",  access_token, userRole, username)
  if(response.data){
    localStorage.setItem('token', `Bearer ${access_token}`)
    localStorage.setItem('userid', userRole._id)
    // added now 
    localStorage.setItem('username', username)
    yield put(setTokenAction(access_token, userRole))
  }else {
    console.log("loading ----")
    yield put(setLoadingAction(true))
  }
}

export default function* loginSaga(){
  yield takeLatest(LOGIN_SAGA_DISPATCH, loginApi);
}