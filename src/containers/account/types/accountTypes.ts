

export type CreateAccountPayload = {
  accountName: string;
  ein: string;
  subtype: string;
}
export type AccountActionType = {
  type: string;
  payload: CreateAccountPayload;
} 