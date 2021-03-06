import { UseAccountProps } from "./UseAccountFormik"
import { CREATE_ACCOUNT_ACTION, GET_ACCOUNTS_ACTION, GET_ACCOUNT_BY_ID_ACTION, GET_FINANCE_DETAIL_ACTION, GET_FINANCE_DETAIL_FROM_SAGA, SAVE_ACCOUNTS_FROM_SAGA, SAVE_ONE_ACCOUNT_FROM_SAGA, UPDATE_ONE_ACCOUNT_ACTION, UPDATE_ONE_ACCOUNT_FROM_SAGA, UPDATE_TO_AWAITING_ICS_ACTION, UPDATE_TO_AWAITING_ICS_FROM_SAGA, UPDATE_TO_EXTERNAL3PLID_APPROVED_ACTION, UPDATE_TO_EXTERNAL3PLID_APPROVED_FROM_SAGA, UPLOAD_FILE_ACTION } from "./constants"


export const createNewAccountAction = (payload: UseAccountProps) => {
  console.log("create account action --->", payload)
  return ({
      type: CREATE_ACCOUNT_ACTION,
      payload
  })
}

export const getAccountsAction = () => {
  console.log("this save accounts from saga action is called")
  return ({
    type: GET_ACCOUNTS_ACTION
  })
}
export const saveAccountsFromSaga = (payload: any) => {
  console.log("this save accounts from saga action is called")
  return ({
    type: SAVE_ACCOUNTS_FROM_SAGA,
    payload
  })
}

export const getAccountByIdAction = (id: string) => {
  console.log("this one takes the user request of one the account id ")
  return({
    type: GET_ACCOUNT_BY_ID_ACTION,
    id
  })
}
export const saveOneAccountFromSaga = (payload: any) => {
  console.log("this save accounts from saga action is called")
  return ({
    type: SAVE_ONE_ACCOUNT_FROM_SAGA,
    payload
  })
}

export const updateOneAccountAction = (payload: any) => {
  console.log("update one *&", payload)
  return(
    {
      type: UPDATE_ONE_ACCOUNT_ACTION,
      payload
    }
  )
}
export const updateOneAccountFromSaga = (payload: any) => {
  console.log("this is update account from saga action is called!", payload)
  return(
    {
      type: UPDATE_ONE_ACCOUNT_FROM_SAGA,
      payload
    }
  )
}

export const getFinanceDetailByAccountId = ({accountId}: any) => {
  console.log("finance details action ", accountId)
  return {
    type: GET_FINANCE_DETAIL_ACTION,
    accountId
  }
}

export const getFinanceDetailsFromSaga = (payload: any) => {
  return {
    type: GET_FINANCE_DETAIL_FROM_SAGA,
    payload
  }
}

export const onApproveToAwaitingICSAction = (accountId: string) => {
  console.log("awaitinc ics action ---> ", accountId)
  return{
    type: UPDATE_TO_AWAITING_ICS_ACTION,
    accountId
  }
}

export const onApproveToAwaitingICSFromSaga = (payload: any) => {
  return {
    type: UPDATE_TO_AWAITING_ICS_FROM_SAGA,
    payload
  }
}

export const updateToExternal3PlIdToApprove = (payload: any) => {
  return {
    type: UPDATE_TO_EXTERNAL3PLID_APPROVED_ACTION,
    payload
  }
}

export const updateToExternal3PlIdToApproveFromSaga = (payload: any) => {
  return {
    type: UPDATE_TO_EXTERNAL3PLID_APPROVED_FROM_SAGA,
    payload
  }
}

export const uploadFileAction = (payload: any) => {
  console.log("file upload action ---> ", payload)
  return {
    type: UPLOAD_FILE_ACTION,
    payload
  }
}