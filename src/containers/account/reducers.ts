import { CREATE_ACCOUNT_ACTION, GET_FINANCE_DETAIL_FROM_SAGA, SAVE_ACCOUNTS_FROM_SAGA, SAVE_ONE_ACCOUNT_FROM_SAGA, UPDATE_ONE_ACCOUNT_FROM_SAGA, UPDATE_TO_AWAITING_ICS_FROM_SAGA } from "./constants"
import { AccountActionType, CreateAccountPayload } from "./types/accountTypes"

export const initialState: CreateAccountPayload = {
  accountName: "",
  ein: '',
  subtype: '',
  addressLine1 : '',
  addressLine2 : '',
  addressLine3 : '',
  city : '',
  state: '',
  country: '',
  zip: "",
  attention: "",
  phone: '',
  email: '',
  hcpName: "",
  hcpNpi: "", 
  accounts: [],
  financeDetails: {}
}

export const AccountReducers = (state_ = initialState, action: AccountActionType) => {
  switch(action.type){
    case CREATE_ACCOUNT_ACTION: {
      const {accountName, ein, subtype, addressLine1, addressLine2, addressLine3, city, email, state, phone, zip, country } = action.payload
      return {
        ...state_,
        accountName, 
        ein, 
        subtype,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
        email,
        phone,
        zip,
        country
      }
    }
    case SAVE_ACCOUNTS_FROM_SAGA: {
      return {
        ...state_,
        accounts: action.payload
      }
    }
    case SAVE_ONE_ACCOUNT_FROM_SAGA: {
      console.log("action payload from reducers 000> ", action.payload)
      return {
        ...state_,
        ...action.payload
      }
    }
    case UPDATE_ONE_ACCOUNT_FROM_SAGA: {
      console.log("*** reducer ", action.payload )
      return {
        ...state_, 
        ...action.payload
      }
    }
    case GET_FINANCE_DETAIL_FROM_SAGA: {
      console.log("finance details reducers --> ", action.payload)
      return {
        ...state_,
        financeDetails: action.payload
      }
    }
    case UPDATE_TO_AWAITING_ICS_FROM_SAGA: {
      return {
        ...state_,
        ...action.payload
      }
    }
    default: return state_;
  }
}