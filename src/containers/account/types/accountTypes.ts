

export type CreateAccountPayload = {
  accountName: string;
  ein: string;
  subtype: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  email: string;
  phone: string;
  attention: string;
  hcpName: string;
  hcpNpi: string;
  accounts: any[];
  financeDetails: {}
}
export type AccountActionType = {
  type: string;
  payload: CreateAccountPayload;
} 