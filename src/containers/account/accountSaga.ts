import { call, put, takeLatest } from "@redux-saga/core/effects"
import { customFetch, uri } from "../../utils/fetchUrl";
import { saveAccountsFromSaga } from "./actions";
import { CREATE_ACCOUNT_ACTION, GET_ACCOUNTS_ACTION } from "./constants"



type CreateAccountResponseType = {data: any}
type CreateAccountResponseType_ = any
function* createAccountSagaApi({payload}: any){
  const body = JSON.stringify({name: payload.accountName, status: 'pending', addressLine1: payload.street1address, country: 'USA', ...payload});
  console.log("create account saga ---> ", body);
  const options ={
    method: "POST",
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response: CreateAccountResponseType = yield call(customFetch, uri+'/account', options);
  console.log("response create account from saga ---> ", response )
}
function* getAllAccounts(){
  const options ={
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log("get Account response --->")
  const response: CreateAccountResponseType_[]= yield call(customFetch, uri+'/account', options);
  console.log("get Account response --->", response)
  yield put(saveAccountsFromSaga(response))

}

export default function* accountSaga(){
  yield takeLatest(CREATE_ACCOUNT_ACTION, createAccountSagaApi);
  yield takeLatest(GET_ACCOUNTS_ACTION, getAllAccounts);
}