import {take, takeLatest, all, put, call} from 'redux-saga/effects';
import { LoginType } from '../../types/login';
import { LOGIN_SAGA_DISPATCH } from './constants';

const uri = 'http://localhost:3000/auth/login'
const customFetch = async(uri: any, options: any) => {
  const response = await fetch(uri, options)
  return await response.json();
}
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
  const response: Promise<Response> = yield call(customFetch, uri, options);
  console.log(response, "from saga")
  console.log("hello saga ----> ")
}

export default function* loginSaga(){
  yield takeLatest(LOGIN_SAGA_DISPATCH, loginApi);
}