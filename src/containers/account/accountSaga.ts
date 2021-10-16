import { call, takeLatest } from "@redux-saga/core/effects"
import { customFetch, uri } from "../../utils/fetchUrl";
import { CREATE_ACCOUNT_ACTION } from "./constants"



type CreateAccountResponseType = {data: any}
function* createAccountSagaApi({payload}: any){
  const body = JSON.stringify(payload);
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

export default function* accountSaga(){
  yield takeLatest( CREATE_ACCOUNT_ACTION, createAccountSagaApi)
}