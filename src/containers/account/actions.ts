import { UseAccountProps } from "./UseAccountFormik"
import { CREATE_ACCOUNT_ACTION, GET_ACCOUNTS_ACTION, GET_ACCOUNT_BY_ID_ACTION, SAVE_ACCOUNTS_FROM_SAGA, SAVE_ONE_ACCOUNT_FROM_SAGA, UPDATE_ONE_ACCOUNT_ACTION, UPDATE_ONE_ACCOUNT_FROM_SAGA } from "./constants"


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
  console.log("this is update account from saga action is called!")
  return(
    {
      type: UPDATE_ONE_ACCOUNT_FROM_SAGA,
      payload
    }
  )
}