import { CREATE_ACCOUNT_ACTION } from "./constants"
import { AccountActionType } from "./types/accountTypes"

export const initialState = {
  accountName: "",
  ein: '',
  subtype: '',
  addressLine1 : '',
  city : '',
  state: '',
  country: '',
  zipCode: "",
  attention: "",
  phone: '',
  email: '',
  affiliated_hcp_name: ""
}

export const AccountReducers = (state = initialState, action: AccountActionType) => {
  switch(action.type){
    case CREATE_ACCOUNT_ACTION: {
      const {accountName, ein, subtype} = action.payload
      return {
        ...state, 
        accountName, 
        ein, 
        subtype
      }
    }
    default: return state;
  }
}