import { ActionsType, StateType } from "../../types/login/types";
import { SET_TOKEN_FROM_SAGA } from "./constants";

export const initialState = {
  email: '',
  password: '',
  accessToken: '',
  userRole: {}
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
      return {
        ...state,
        userRole: action.userRole,
        accessToken: action.accessToken
      }
    }
    default: return state;
  }
}