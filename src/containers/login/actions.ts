import { LoginType } from "../../types/login"
import { LOGIN_SAGA_DISPATCH, SET_TOKEN_FROM_SAGA } from "./constants"



export const loginDispatch = ({email, password}: LoginType) => {
  console.log("actions ", email, password)
  return {
    type: LOGIN_SAGA_DISPATCH,
    email,
    password,
  }
}

export const setTokenAction = (token: string, role: any) => {
  return {
    type: SET_TOKEN_FROM_SAGA,
    token,
    role
  }
}