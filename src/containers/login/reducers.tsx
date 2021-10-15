import { LoginActionType } from "./actions";

export const initialState = {
  email: '',
  password: '',
  accessToken: ''
}
type actionsType = LoginActionType;
export const loginReducers = (state = initialState, action: actionsType) => {
  switch (action.type) {
    case "LOGIN_DISPATCH":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        accessToken: action?.payload.accessToken
      }
    default: return state;
  }
}