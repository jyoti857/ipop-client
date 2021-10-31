import { ActionsType } from "../../types/login/types";
import { SET_LOADING_ACTION, SET_TOKEN_FROM_SAGA } from "./constants";

export const initialState = {
  email: '',
  password: '',
  accessToken: '',
  userRole: {},
  loading: false,
}

export const loginReducers = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "LOGIN_DISPATCH":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        accessToken: action?.payload.accessToken
      }
    case SET_TOKEN_FROM_SAGA: {
      console.log("susd ---> ", action.accessToken, action.userRole)
      return {
        ...state,
        userRole: action.userRole,
        accessToken: action.accessToken
      }
    }
    case SET_LOADING_ACTION: {
      return {
        ...state,
        loading: action.payload
      }
    }
    default: return state;
  }
}