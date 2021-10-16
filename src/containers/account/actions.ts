import { UseAccountProps } from "../../components/input/useCustomFormik"
import { CREATE_ACCOUNT_ACTION } from "./constants"


export const createNewAccountAction = (payload: UseAccountProps) => {
  console.log("create account action --->", payload)
  return ({
      type: CREATE_ACCOUNT_ACTION,
      payload
  })
}