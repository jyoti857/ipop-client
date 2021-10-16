import { UseAccountProps } from "./UseAccountFormik"
import { CREATE_ACCOUNT_ACTION, GET_ACCOUNTS_ACTION, SAVE_ACCOUNTS_FROM_SAGA } from "./constants"


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