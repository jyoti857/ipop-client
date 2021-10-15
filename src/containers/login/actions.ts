import { LoginType } from "../../types/login"
import { LOGIN_SAGA_DISPATCH } from "./constants"



export type LoginActionType = {
  type: string;
  payload: LoginType;
}
export type LoginDispatchType = {
  ({}: LoginType): LoginActionType
}
export const loginDispatch = ({email, password}: LoginType) => {
  console.log("actions ", email, password)
  return {
    type: LOGIN_SAGA_DISPATCH,
     
      email,
      password,
    
  }
}