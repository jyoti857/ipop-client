import { LoginType } from "../login"

export type LoginActionType = {
  type: string;
  payload: LoginType;
}

export type SetTokenActionType = {
  type: string;
  accessToken: string;
  userRole: any
}
export type LoginDispatchType = {
  ({}: LoginType): LoginActionType
}

export type StateType = {
  email?: string;
  password?: string;
  accessToken?: string;
  userRole?: string;
}
export type ActionsType = LoginActionType  & SetTokenActionType;