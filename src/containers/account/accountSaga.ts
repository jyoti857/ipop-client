import { call, put, takeLatest } from "@redux-saga/core/effects"
import { createUploadFileChannel } from "../../utils/createUploadFileChannel";
import { customFetch, uri } from "../../utils/fetchUrl";
import { getFinanceDetailsFromSaga, onApproveToAwaitingICSFromSaga, saveAccountsFromSaga, saveOneAccountFromSaga, updateOneAccountFromSaga } from "./actions";
import { CREATE_ACCOUNT_ACTION, GET_ACCOUNTS_ACTION, GET_ACCOUNT_BY_ID_ACTION, GET_FINANCE_DETAIL_ACTION, UPDATE_ONE_ACCOUNT_ACTION, UPDATE_TO_AWAITING_ICS_ACTION, UPDATE_TO_EXTERNAL3PLID_APPROVED_ACTION, UPLOAD_FILE_ACTION } from "./constants"



type CreateAccountResponseType = {data: any}
type CreateAccountResponseType_ = any
function* createAccountSagaApi({payload}: any){
  const body = JSON.stringify({name: payload.accountName, status: 'pending', addressLine1: payload.street1address, country: 'USA', ...payload});
  console.log("create account saga ---> ", body);
  const options ={
    method: "POST",
    body,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('token')!
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

function* getAccountByIdApi({id}: any){
  const options ={
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log("get account by id ===> ", id );
  const response: CreateAccountResponseType_[] = yield call(customFetch, uri+`/account/${id}`, options);
  console.log("get account by id response saga ---> ", response);
  if(response){
    yield put(saveOneAccountFromSaga(response))
  }
}

function* updateAccount({payload}: any){
  // console.log("submit from update account saga --> ", payload)
  const {accountId, ...rest} = payload
  const body = JSON.stringify(rest)
  console.log("submit from update account saga 1--> ", payload, accountId)
  const options = {
    method: "PUT",
    body,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('token')!
    }
  }
  const response: CreateAccountResponseType = yield call(customFetch, uri+`/account/${accountId}`, options)
  
  console.log("submit from update account saga response --> ", response)
  if(response){
    yield put(updateOneAccountFromSaga(response))
  }
}

function* getFinanceDetailByAccountId({accountId}: any){
  console.log("finance details account id  ----> ", accountId)
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('token')!
    }
  }
  console.log("finance details response ")
  const response: CreateAccountResponseType = yield call(customFetch, uri+`/finance-detail/${accountId}`, options)
  console.log("finance details response ", response)
  if(response){
    yield put(getFinanceDetailsFromSaga(response))
  }
}

function* updateToAwaitingICS({accountId}: any){
  console.log("update to awaiting ics  account id ----> ",  accountId)
  const options = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('token')!
    }
  }
  console.log("finance details response ")
  const response: CreateAccountResponseType = yield call(customFetch, uri+`/account/toICS/${accountId}`, options)
  console.log("to awaiting ICS saga response ", response)
  if(response){
    yield put(onApproveToAwaitingICSFromSaga(response))
  }
}

function* updateToExternal3pIdApproved({payload}: any){
  console.log("handle awaiting saga details account id  ----> ", payload)
  const {accountId, ...rest} = payload
  const body = JSON.stringify(rest)
  const options = {
    method: "PUT",
    body,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('token')!
    }
  }
  const response: Partial<CreateAccountResponseType> = yield call(customFetch, uri+`/account/update/${accountId}`, options)
  console.log("response ---> ", response)
}

function* uploadFile({payload}: any){
  // const {...rest} = payload
  // const body = JSON.stringify(rest);
  console.log("upload body saga ", payload)
  const options = {
    method: "POST",
    body: payload,
    headers: {
      'Content-Type': 'application/vnd.ms-excel',
      "Authorization": localStorage.getItem('token')!
    }
  }
  // const response: Partial<any> = yield call(customFetch, uri+`/account/upload`, options)
  const response: Partial<any> = yield call(createUploadFileChannel, uri+'/account/upload', payload)
  console.log("file response from saga ---> ", response)
}
export default function* accountSaga(){
  yield takeLatest(CREATE_ACCOUNT_ACTION, createAccountSagaApi);
  yield takeLatest(GET_ACCOUNTS_ACTION, getAllAccounts);
  yield takeLatest(GET_ACCOUNT_BY_ID_ACTION, getAccountByIdApi);
  yield takeLatest(UPDATE_ONE_ACCOUNT_ACTION, updateAccount);
  yield takeLatest(GET_FINANCE_DETAIL_ACTION, getFinanceDetailByAccountId);
  yield takeLatest(UPDATE_TO_AWAITING_ICS_ACTION, updateToAwaitingICS);
  yield takeLatest(UPDATE_TO_EXTERNAL3PLID_APPROVED_ACTION, updateToExternal3pIdApproved);
  yield takeLatest(UPLOAD_FILE_ACTION, uploadFile)
}